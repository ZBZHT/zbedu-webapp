import EventBus from './EventBus';

export default function(modalRef) {
    if (!modalRef) return;

    EventBus.$on('prompt', (param = {}) => {
        modalRef.modalPrompt(param);
    });
}