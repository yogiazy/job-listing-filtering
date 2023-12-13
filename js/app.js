const $ = (x) => document.querySelector(x);

function addFilter(data) {
        const tag = data.getAttribute('tag');
        const filter = document.createElement('div');
        filter.className = 'list_tag relative';
        filter.setAttribute('tag', `${tag}`);
        filter.innerText = `${data.textContent}`;
        const iconRemove = document.createElement('img');
        iconRemove.src = './images/icon-remove.svg';
        iconRemove.className = 'icon_remove';
        iconRemove.alt = 'icon-remove';

        $('#group_list').classList.add('space-1');
        $('#sort_tag').appendChild(filter);
        $('#group_filter').classList.remove('hidden');
        console.log($('#sort_tag'));
}

function removeFilter() {
        $('#group_filter').classList.add('hidden');
        $('#group_list').classList.remove('space-1');
        $('#sort_tag').innerHTML = '';
}