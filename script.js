document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('new-post-content');
    const createPostBtn = document.getElementById('create-post-btn');
    const postsList = document.getElementById('posts-list');

    // Функция для загрузки постов из localStorage
    function loadPosts() {
        const storedPosts = localStorage.getItem('posts');
        return storedPosts ? JSON.parse(storedPosts) : [];
    }

    // Функция для сохранения постов в localStorage
    function savePosts(posts) {
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    // Функция для отображения постов на странице
    function displayPosts() {
        postsList.innerHTML = '';
        const posts = loadPosts().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        posts.forEach(post => {
            const li = document.createElement('li');
            li.classList.add('post');
            li.innerHTML = `
                <p>${post.content}</p>
                <small>Опубликовано: ${new Date(post.timestamp).toLocaleString()}</small>
            `;
            postsList.appendChild(li);
        });
    }

    // Обработчик нажатия на кнопку "Опубликовать"
    createPostBtn.addEventListener('click', () => {
        const content = postForm.value.trim();
        if (content) {
            const newPost = {
                id: Date.now(),
                content: content,
                timestamp: new Date().toISOString()
            };
            const posts = loadPosts();
            posts.push(newPost);
            savePosts(posts);
            postForm.value = '';
            displayPosts();
        } else {
            alert('Пожалуйста, введите текст поста.');
        }
    });

    // Загрузка и отображение постов при загрузке страницы
    displayPosts();
});
