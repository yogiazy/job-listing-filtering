const $ = (x) => document.querySelector(x);
const $$ = (x) => document.querySelectorAll(x);

function addFilter(data) {
        const tag = data.getAttribute('tag');
        const existingElement = $(`#sort_tag [tag="${tag}"]`);

        if (!existingElement) {
                const filter = document.createElement('div');
                filter.className = 'list_tag relative';
                filter.setAttribute('tag', tag);
                filter.innerText = data.textContent;

                const iconRemove = document.createElement('img');
                iconRemove.src = './images/icon-remove.svg';
                iconRemove.className = 'icon_remove';
                iconRemove.alt = 'icon-remove';
                iconRemove.setAttribute('onclick', 'removeAdd(this)');
                filter.appendChild(iconRemove);

                filterByTag(tag);
                $('#group_list').classList.add('space-1');
                $('#sort_tag').appendChild(filter);
                $('#group_filter').classList.remove('hidden');
        }
}

function removeFilter() {
        $('#group_filter').classList.add('hidden');
        $('#group_list').classList.remove('space-1');
        $('#sort_tag').innerHTML = '';
}

function removeAdd(data) {
        const d = data.parentElement;
        const n = $$('.list_tag').length;
        $('#sort_tag').removeChild(d);
        if (n === 1) {
                removeFilter();
        }
}

function filterByTag(tag) {
        const jobElements = document.querySelectorAll('.list-job');
        jobElements.forEach(function (jobElement) {
                const tagElements = jobElement.querySelectorAll('.tag span');
                let showJob = false;
                tagElements.forEach(function (tagElement) {
                        const elementTag = tagElement.getAttribute('tag');
                        if (elementTag === tag) {
                                showJob = true;
                        }
                });
                if (!showJob) {
                        jobElement.classList.add('hidden');
                }
        });
}

