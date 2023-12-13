const $ = (x) => document.querySelector(x);

function addFilter(data) {
        const tag = data.getAttribute('tag');
        const elementFilter = `
                <div class="list_tag relative" tag="${tag}">${data.textContent}
                        <img src="./images/icon-remove.svg" class="icon_remove" alt="icon-remove">
                </div>`;
        $('#group_filter').classList.remove('hidden');
        $('#group_list').classList.add('mt-20');
        // $('#sort_tag').appendChild(elementFilter);
        console.log($('#sort_tag'));
}