const $ = (x) => document.querySelector(x);
const $$ = (x) => document.querySelectorAll(x);
let dataTag = [];

function addFilter(data) {
        const tag = data.getAttribute('tag');
        const existingElement = $(`#sort_tag [tag="${tag}"]`);

        if (!existingElement) {
                dataTag.push(tag);
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

                filterByTag();
                $('#group_list').classList.add('space-1');
                $('#sort_tag').appendChild(filter);
                $('#group_filter').classList.remove('hidden');
        }
}

function removeFilter() {
        $('#group_filter').classList.add('hidden');
        $('#group_list').classList.remove('space-1');
        $('#sort_tag').innerHTML = '';
        filterByTag();
}

function removeAdd(data) {
        const d = data.parentElement;
        const n = $$('.list_tag').length;
        $('#sort_tag').removeChild(d);
        dataTag = dataTag.filter(element => element !== d.getAttribute('tag'));
        filterByTag();
        if (n === 1) {
                removeFilter();
        }
}

function filterByTag() {
        const jobElements = $$('.list-job');

        if (dataTag.length === 0) {
                jobElements.forEach(function (jobElement) {
                        jobElement.classList.remove('hidden');
                });
        } else {
                jobElements.forEach(function (jobElement) {
                        const tagElements = jobElement.querySelectorAll('.tag span');
                        // let showJob = false;
        
                        const showJob = dataTag.every(function(dataTagValue) {
                                return Array.from(tagElements).some(function(tagElement) {
                                    const elementTag = tagElement.getAttribute('tag');
                                    return dataTagValue === elementTag;
                                });
                            });
        
                        // Menentukan apakah elemen pekerjaan harus ditampilkan atau disembunyikan
                        if (!showJob) {
                                jobElement.classList.add('hidden');
                        } else {
                                jobElement.classList.remove('hidden');
                        }
                });
        }
}


