import EventBus from './EventBus';

export default {
    methods: {
        prompt: function(message, title, callback, options) {
            if (typeof title === 'function') {
                options = callback;
                callback = title;
                title = undefined;
            }
            EventBus.$emit('prompt', {message: message, title: title, callback: callback, options: options || {}});
        }
    }
};