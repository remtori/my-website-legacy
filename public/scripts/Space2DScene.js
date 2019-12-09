import Scene from "/assets/libs/wwwtyro@space-2d/scene.js";

export default class Space2DScene {
    constructor(cvs, setNewSize) {
        this.displayCanvas = cvs;
        this.buffer = document.createElement('canvas');
        this.watcher = null;
        this.lastSize = {};        
        this.currSize = {};        
        this.setNewSize = setNewSize;        
        this.props = {
            shortScale: true,
            renderPointStarts: true,
            renderNebulae: true,
            renderStars: true,
            renderSun: false,
            seed: "remtori"
        };            
        
        setNewSize(cvs);
        this.buffer.width = window.screen.width;
        this.buffer.height = window.screen.height * 10;                   

        this._renderScene();
        this.queueRender();
    }

    _renderScene() {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = this.buffer.width;
        tempCanvas.height = this.buffer.height;
        new Scene(tempCanvas).render(this.props);
        this.buffer.getContext('2d').drawImage(tempCanvas, 0, 0);        
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
                        self.buffer.height += window.screen.height * 10;
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
        requestAnimationFrame(() => {
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

    setProperties(p) {
        this.props = Object.assign(this.props, p);
        this._renderScene();
        this.queueRender();
    }
}