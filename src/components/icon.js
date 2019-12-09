/**
 * Modified gist to use fontawesome as a component
 * Original: https://gist.github.com/danalloway/40402632adfb4bf5d9578210cd3dbc14
 */

import { h, createElement } from 'preact'

import { library, icon, parse } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { faTags } from "@fortawesome/free-solid-svg-icons/faTags";

library.add(
    faUser, faClock, faTags
);

const Icon = props => {
    const { icon: iconArgs, mask: maskArgs, symbol, class: className } = props
    const classes = objectWithKey('classes', [
        ...classList(props),
        ...className.split(' ')
    ])
    const transform = objectWithKey(
        'transform',
        typeof props.transform === 'string'
            ? parse.transform(props.transform)
            : props.transform
    )
    const mask = objectWithKey('mask', normalizeIconArgs(maskArgs))
    const renderedIcon = icon(normalizeIconArgs(iconArgs), {
        ...classes,
        ...transform,
        ...mask,
        symbol
    })

    const { abstract } = renderedIcon
    const convertCurry = convert.bind(null, createElement)
    const extraProps = {}

    Object.keys(props).forEach(key => {
        if (!Icon.defaultProps.hasOwnProperty(key)) extraProps[key] = props[key]
    })

    return convertCurry(abstract[0], extraProps)
}

const normalizeIconArgs = icon => {
    if (icon === null) {
        return null
    }

    if (typeof icon === 'object' && icon.prefix && icon.iconName) {
        return icon
    }

    if (Array.isArray(icon) && icon.length === 2) {
        return { prefix: icon[0], iconName: icon[1] }
    }

    if (typeof icon === 'string') {
        return { prefix: 'fas', iconName: icon }
    }
}

const objectWithKey = (key, value) => {
    return (Array.isArray(value) && value.length > 0) ||
        (!Array.isArray(value) && value)
        ? { [key]: value }
        : {}
}

const classList = props => {
    let classes = {
        'fa-spin': props.spin,
        'fa-pulse': props.pulse,
        'fa-fw': props.fixedWidth,
        'fa-border': props.border,
        'fa-li': props.listItem,
        'fa-flip-horizontal':
            props.flip === 'horizontal' || props.flip === 'both',
        'fa-flip-vertical': props.flip === 'vertical' || props.flip === 'both',
        [`fa-${props.size}`]: props.size !== null,
        [`fa-rotate-${props.rotation}`]: props.rotation !== null,
        [`fa-pull-${props.pull}`]: props.pull !== null
    }

    return Object.keys(classes)
        .map(key => (classes[key] ? key : null))
        .filter(key => key)
}

const convert = (createElement, element, extraProps = {}) => {
    const children = (element.children || []).map(
        convert.bind(null, createElement)
    )

    const mixins = Object.keys(element.attributes || {}).reduce(
        (acc, key) => {
            const val = element.attributes[key]

            switch (key) {
                case 'class':
                    acc.attrs['className'] = val
                    delete element.attributes['class']
                    break
                case 'style':
                    acc.attrs['style'] = styleToObject(val)
                    break
                default:
                    if (
                        key.indexOf('aria-') === 0 ||
                        key.indexOf('data-') === 0
                    ) {
                        acc.attrs[key.toLowerCase()] = val
                    } else {
                        acc.attrs[key] = val
                    }
            }

            return acc
        },
        { attrs: {} }
    )

    const { style: existingStyle = {}, ...remaining } = extraProps

    mixins.attrs['style'] = { ...mixins.attrs['style'], ...existingStyle }

    return createElement(
        element.tag,
        { ...mixins.attrs, ...remaining },
        ...children
    )
}

Icon.defaultProps = {
    border: false,
    class: '',
    mask: null,
    fixedWidth: false,
    flip: null,
    icon: null,
    listItem: false,
    pull: null,
    pulse: false,
    name: '',
    rotation: null,
    size: null,
    spin: false,
    symbol: false,
    transform: null
}

export default Icon
