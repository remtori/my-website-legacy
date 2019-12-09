import { h, Component } from 'preact';

export default class extends Component {
    constructor(props, context) {
        super(props, context);

        let scene;
        this.componentDidMount = _ => {
            import("../lib/wwwtyro@nebula/index.js")
                .then(m=>m.default)
                .then(TyroNebula => {
                    scene = new NebulaScene(
                        this.base,
                        "remtori",
                        cvs => {
                            const D = document;
                            cvs.width = D.body.scrollWidth;
                            cvs.height = D.body.scrollHeight;
                        },
                        TyroNebula     
                    );
                    scene.startWatch();
            
                    document.body.style.backgroundColor = "transparent";
                });
        }

        this.render = _ => <canvas id="backgroundCanvas"></canvas>
    }
}

class NebulaScene {
    constructor(cvs, seed, setNewSize, SceneClazz) {
        this.displayCanvas = cvs;
        this.buffer = new OffscreenCanvas(0, 0);
        this.webglBuffer = new OffscreenCanvas(0, 0);
        this.sceneRenderer = new SceneClazz(this.webglBuffer, seed);
        this.watcher = null;
        this.lastSize = {};        
        this.currSize = {};        
        this.setNewSize = setNewSize;
        
        setNewSize(cvs);
        this.buffer.width = window.screen.width;
        this.buffer.height = window.screen.height * 10;                   

        this._renderScene();
        this.queueRender();
    }

    _renderScene() {
        this.webglBuffer.width = this.buffer.width;
        this.webglBuffer.height = this.buffer.height;        
        this.sceneRenderer.render();
        this.buffer.getContext('2d').drawImage(this.webglBuffer, 0, 0);        
    }

    startWatch() {
        // watch for resize;
        const self = this;        

        function watch() {
            self.setNewSize(self.currSize);        
            if (self.lastSize.width !== self.currSize.width ||
                self.lastSize.height !== self.currSize.height) {

                self.setNewSize(self.displayCanvas);
                self.lastSize.width = self.currSize.width;
                self.lastSize.height = self.currSize.height;                

                if (self.currSize.width > self.buffer.width || 
                    self.currSize.height > self.buffer.height) {
                        self.buffer.width = self.currSize.width + 512;
                        self.buffer.height = self.currSize.height + 512;
                        self._renderScene();
                        self._render();
                    }

                self._render();
            }
            
            self.watcher = requestAnimationFrame(watch);
        }

        this.watcher = requestAnimationFrame(watch);
    }    

    stopWatch() {
        cancelAnimationFrame(this.watcher);
    }

    queueRender() {
        requestAnimationFrame(_ => {
            this._render();
        })
    }

    _render() {
        this.displayCanvas.getContext('2d').drawImage(
            this.buffer, 
            0, 0, 
            this.displayCanvas.width, this.displayCanvas.height,
            0, 0, 
            this.displayCanvas.width, this.displayCanvas.height
        );
    }
}