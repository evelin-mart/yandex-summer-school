const { fetcher } = require('./fetcher');

const regexp = /<a[^>]*href=["']([^"']*)["']/gm;

async function crawler(domain) {
    const stack = [`${domain}/`];
    const visited = [];
    const result = [];

    while (stack.length) {
        const resource = stack.pop();
        let response;

        try {
            response = await fetcher(resource);
            if (response.status === 500) {
                response = await fetcher(resource);
            }
        } catch (error) {
            return [];
        }

        visited.push(resource);

        if (response.status === 200) {
            result.push(resource);
            const page = await response.text();
            const links = Array.from(page.matchAll(regexp)).map((match) => match[1]);
            if (links.length) {
                links.forEach((link) => {
                    if (visited.indexOf(link) === -1) {
                        stack.push(link);
                    }
                });
            }
        }
    }

    return result;
}

module.exports = { crawler };
