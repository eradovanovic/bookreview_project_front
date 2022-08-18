const message = (messages, context, area, code, defaultMessage, constraints = {}) => {
    function contextMessages() {
        let sub = messages
        if (context) {
            sub = sub[context] || sub
        }
        if (area) {
            sub = sub[area] || sub
        }
        return sub
    }

    function areaMessages() {
        let sub = messages
        if (area) {
            sub = sub[area] || sub
        }
        return sub
    }

    const msg =
        contextMessages()[code] ||
        areaMessages()[code] ||
        messages[code] ||
        defaultMessage ||
        `Unknown error ${code}`

    return msg.formatVars(constraints)
}
const messageProvider = {
    message
}

export default messageProvider;