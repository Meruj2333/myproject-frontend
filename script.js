const listEl = document.querySelector('#list');
const titleEl = document.querySelector('#title');
const statusEl = document.querySelector('#status');
const addBtn = document.querySelector('#add');

function loadPosts() {
    fetch('http://localhost:3000/lists')
        .then(res => {
            if (!res.ok) throw res.status;
            return res.json();
        })
        .then(data => {
            renderList(data);
        })
        .catch(err => {
            console.error('Error fetching posts:', err);
        });
}

function renderList(items) {
    listEl.innerHTML = items.map(item => `
        <li class="list-group-item" data-id="${item.id}">
            <div class="task-left" style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
                <span class="task-text" style="font-weight:700;">${item.title}</span>
                <span class="badge status ${item.body === 'Pending' ? 'status-pending' : item.body === 'In Progress' ? 'status-progress' : 'status-done'}">${item.body}</span>
            </div>
            <div class="d-flex gap-2">
                <button class="btn-ghost btn-del">Delete</button>
            </div>
        </li>
    `).join('');
}

addBtn.onclick = function () {
    const title = titleEl.value.trim();
    const status = statusEl.value;

    if (!title) {
        alert('Գրիր առաջադրանքը!');
        return;
    }

    fetch('http://localhost:3000/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body: status })
    })
        .then(res => {
            if (!res.ok) throw res.status;
            return res.json();
        })
        .then(data => {
            titleEl.value = '';
            statusEl.value = 'Pending';
            loadPosts();
        })
        .catch(err => console.error('Error adding post:', err));
};
listEl.addEventListener('click', function (e) {
    if (!e.target.classList.contains('btn-del')) return;

    const li = e.target.closest('li[data-id]');
    const id = li.dataset.id;

    fetch(`http://localhost:3000/delete/${id}`, { method: 'DELETE' })
        .then(res => {
            if (!res.ok) throw res.status;
            loadPosts();
        })
        .catch(err => console.error('Error deleting post:', err));
});

loadPosts();
