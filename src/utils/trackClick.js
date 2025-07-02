import { logEvtToLocalStorage } from "./log";

export default {
    mounted(el, binding) {
        const eventName = binding.arg || 'click';
        const trackData = binding.value;

        el.addEventListener(eventName, (e) =>{
            logEvtToLocalStorage({
                timestamp: new Date().toISOString(),
                element: el.tagName.toLowerCase(),
                id: el.id || null,
                class: el.className || null,
                text: el.textContent.trim().substring(0, 50),
                ...(typeof trackData === 'object' ? trackData : { value: trackData })
            })
        })
    }
}