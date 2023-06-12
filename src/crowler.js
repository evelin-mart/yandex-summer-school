const { fetcher } = require('./fetcher');

const regexp = /<a[^>]*href=["']([^"']*)["']/gm;

async function crowler(domain) {
    const stack = [`${domain}/`];
    const result = [];

    while (stack.length) {
        const resource = stack.pop();
        const response = await fetcher(resource);
        if (response.status === 200) {
            result.push(resource);
            const page = await response.text();
            const links = [...page.matchAll(regexp)];
            if (links.length) {
                links.forEach((link) => {
                    stack.push(link);
                });
            }
            console.log(page, links);
        }
    }

    return result;
}

module.exports = { crowler };
