const json_encode = require('json_encode');
class Chatfuel {
    constructor() {
        this.result = new Object({ messages: [] });
        // return this;
    }

    sendText(text) {
        this.result.messages.push({ text });
        return this;
    }
    render() {
        if (this.result.messages) this.result.messages = this.result.messages.slice(0, 10);
        let result = { ...this.result };
        this.result = new Object({ messages: [] });
        return json_encode(result);
    }

    _sendAttachment({ type, payload }) {
        this.result.messages.push({ attachment: { type, payload } });
        return this;
    }

    sendImage(url) {
        return this._sendAttachment({ type: 'image', payload: { url } })
    }

    sendVideo(url) {
        return this._sendAttachment({ type: 'video', payload: { url } })
    }

    sendAudio(url) {
        return this._sendAttachment({ type: 'audio', payload: { url } })
    }

    sendFile(url) {
        return this._sendAttachment({ type: 'file', payload: { url } })
    }

    creatButtonToBlock({ title, block_names, set_attributes }) {
        return { type: 'show_block', title, block_names, set_attributes }
    }

    creatButtonToURL({ title, url }) {
        return { type: 'web_url', url, title }
    }

    createButtonPostBack({ url, title }) {
        return { type: 'json_plugin_url', url, title }
    }

    createCallButton({ phone_number, title }) {
        return { type: 'phone_number', phone_number, title }
    }

    createShareButton() {
        return { type: 'element_share' }
    }
    createElement({ title, image_url, subtitle, buttons }) {
        return { title, image_url, subtitle, buttons, default_action: { messenger_extensions: true } }
    }

    createQuickReplyButton({ title, block_names }) {
        return { title, block_names }
    }
    createQuickReplyPostBack({ title, url }) {
        return { title, url, type: 'json_plugin_url' }
    }
    createQuickReply({ text, quick_replies }) {
        this.result.messages.push({ text, quick_replies });
        return this;
    }

    sendGalleries({ elements }) {
        return this._sendAttachment({
            type: 'template',
            payload: {
                template_type: 'generic',
                image_aspect_ratio: 'square',
                elements
            }
        })
    }

    sendLists({ elements }) {
        return this._sendAttachment({
            type: 'template',
            payload: {
                template_type: 'list',
                top_element_style: 'compact',
                elements
            }
        })
    }
    sendButton({ text, buttons }) {
        return this._sendAttachment({
            type: 'template',
            payload: {
                template_type: 'button',
                text,
                buttons
            }
        })
    }

    setAttributes(attributes) {
        this.result.set_attributes = { ...attributes }
        return this;
    }

    redirectToBlock(blocks) {
        this.result = { redirect_to_blocks: [...blocks] }
        return this.render()
    }
}

module.exports = Chatfuel;
