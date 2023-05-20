const requestURL = document.currentScript.getAttribute("request");
window.templateRequest = fetch(requestURL).then(res => res.json());

new MutationObserver(async (mutations) => {
    for(const { addedNodes } of mutations) {
        for(const node of addedNodes) {
            if(
                node.getAttribute?.("processed") == "true"
                || node.nodeName == "SCRIPT"
                || node.children?.length
                || !node.innerHTML?.match(/\{.+?\}/)
            ) continue;
            console.log(node);
            const placeholder = document.createElement("div");
            node.replaceWith(placeholder);
            const requestContent = await templateRequest;
            node.innerHTML = node.innerHTML.replace(
                /(\{.+?\})/g,
                key => requestContent?.[key.match(/\{(.+?)\}/)[1]]
            );
            node.setAttribute("processed", "true");
            placeholder.replaceWith(node);
        }
    }
}).observe(document, { subtree: true, childList: true });