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
        dataTag = [];
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
                        jobElement.classList.add('list-filtered');
                });
        } else {
                jobElements.forEach(function (jobElement) {
                        const tagElements = jobElement.querySelectorAll('.tag span');
                        const showJob = dataTag.every(function (dataTagValue) {
                                return Array.from(tagElements).some(function (tagElement) {
                                        const elementTag = tagElement.getAttribute('tag');
                                        return dataTagValue === elementTag;
                                });
                        });

                        if (!showJob) {
                                jobElement.classList.add('hidden');
                                jobElement.classList.remove('list-filtered');
                        } else {
                                jobElement.classList.remove('hidden');
                                jobElement.classList.add('list-filtered');
                        }
                });
        }
}

window.onload = function () {
        fetch('./data.json')
                .then(response => response.json())
                .then(data => {
                        console.log(data);
                        console.log(data[0]);
                        console.log(data[0].id);

                        for (var i = 0; i < data.length; i++) {
                                const newJobElement = document.createElement('div');
                                newJobElement.id = data[i].id;
                                newJobElement.classList.add('list-job', 'list-filtered');

                                const flexContainer = document.createElement('div');
                                flexContainer.classList.add('flex', 'lg:items-center', 'lg:justify-center', 'gap-6');

                                const imageContainer = document.createElement('div');
                                imageContainer.classList.add('absolute', 'w-12', '-top-6', 'lg:relative', 'lg:top-0', 'lg:w-20');

                                const image = document.createElement('img');
                                image.src = data[i].logo;
                                image.classList.add('w-full');
                                image.alt = data[i].company;

                                imageContainer.appendChild(image);

                                const textContainer = document.createElement('div');
                                textContainer.classList.add('block');

                                const heading2 = document.createElement('h2');
                                heading2.textContent = data[i].company;

                                const newSpan = document.createElement('span');
                                newSpan.classList.add('ml-4');
                                newSpan.classList.add('mr-2');
                                if (data[i].new) {
                                        newSpan.classList.add('new');
                                        newSpan.textContent = 'NEW!';
                                }
                                

                                const featuredSpan = document.createElement('span');
                                if (data[i].featured) {
                                        featuredSpan.classList.add('featured');
                                        featuredSpan.textContent = 'FEATURED';
                                        newJobElement.classList.add('list-active');
                                }

                                heading2.appendChild(newSpan);
                                heading2.appendChild(featuredSpan);

                                const heading3 = document.createElement('h3');
                                heading3.textContent = data[i].position;

                                const infoContainer = document.createElement('div');
                                infoContainer.classList.add('flex', 'items-center', 'gap-x-2');

                                const timeInfo = document.createElement('h4');
                                timeInfo.textContent = data[i].postedAt;

                                const dot1 = document.createElement('span');
                                dot1.classList.add('dot');

                                const jobType = document.createElement('h4');
                                jobType.textContent = data[i].contract;

                                const dot2 = document.createElement('span');
                                dot2.classList.add('dot');

                                const locationInfo = document.createElement('h4');
                                locationInfo.textContent = data[i].location;

                                infoContainer.appendChild(timeInfo);
                                infoContainer.appendChild(dot1);
                                infoContainer.appendChild(jobType);
                                infoContainer.appendChild(dot2);
                                infoContainer.appendChild(locationInfo);

                                textContainer.appendChild(heading2);
                                textContainer.appendChild(heading3);
                                textContainer.appendChild(infoContainer);

                                flexContainer.appendChild(imageContainer);
                                flexContainer.appendChild(textContainer);

                                const hrElement = document.createElement('hr');
                                hrElement.classList.add('border-t-2', 'my-2', 'lg:hidden');

                                const tagContainer = document.createElement('div');
                                tagContainer.classList.add('tag');

                                let tags = [];
                                tags.push(data[i].role);
                                tags.push(data[i].level);
                                for (j in data[i].languages) {
                                        tags.push(data[i].languages[j]);
                                }
                                for (j in data[i].tools) {
                                        tags.push(data[i].tools[j]);
                                }

                                tags.forEach(tagText => {
                                        const tagSpan = document.createElement('span');
                                        tagSpan.setAttribute('tag', `tag_${tagText.toLowerCase()}`);
                                        tagSpan.textContent = tagText;
                                        tagSpan.onclick = function () {
                                                addFilter(this);
                                        };
                                        tagContainer.appendChild(tagSpan);
                                });

                                newJobElement.appendChild(flexContainer);
                                newJobElement.appendChild(hrElement);
                                newJobElement.appendChild(tagContainer);

                                const groupListElement = document.getElementById('group_list');

                                groupListElement.appendChild(newJobElement);

                        }
                })
}
