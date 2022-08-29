fetch('https://jsonplaceholder.typicode.com/comments')
.then(res => res.json())
.then(data => getComments(data.slice(0, 20)))

const getComments = comments => {
    comments.forEach(comment => {
        const {id, name, email, body} = comment;
        const commentDiv = document.createElement('div');
        commentDiv.setAttribute('onclick', `getId(${id})`);
        // commentDiv.setAttribute('id', 'buttonmodal');
        commentDiv.classList.add('text-gray-500', 'border', 'hover:border-emerald-400', 'rounded', 'p-5', 'space-y-4', 'cursor-pointer');
        commentDiv.innerHTML = `
            <div class="flex items-center gap-4">
                <img class="h-10" src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" alt="">
                <div>
                    <h3 class="text-xl font-semibold text-black">${name}</h3>
                    <h4>${email}</h4>
                </div>
            </div>
            <div>
                <p>${body}</p>
            </div>
        `;
        document.getElementById('comments-area').appendChild(commentDiv);
    });
}

const getId = postId => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(res => res.json())
    .then(data => getPosts(data))
}

const getPosts = post => {
    const {title, body} = post;
    const postDiv = document.createElement('div');
    postDiv.innerHTML = `
        <div id="modal-box" class="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-emerald-500 bg-opacity-30 transform scale-100 transition-transform duration-300">
            <div class="bg-white w-[90%] md:w-4/5 lg:w-[45%] rounded">
                <div class="flex justify-between items-center border-b mt-2 px-8 py-3">
                    <h3 class="text-xl font-semibold">Post ID: ${post.id}</h3>
                    <button id="close-button" type="button" class="text-white px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 rounded">Close</button>
                </div>
                <div class="mb-2 px-8 py-5">
                    <p class="text-lg font-semibold"> ${title}</p>
                    <p>${body}</p>
                </div>
            </div>
        </div>
    `;
    document.getElementById('posts-area').appendChild(postDiv);
    const modalBox = document.getElementById('modal-box');
    modalBox.classList.add('scale-100');
    const closeButton = document.getElementById('close-button');
    closeButton.addEventListener('click', () => {
        modalBox.classList.remove('scale-100');
        postDiv.remove();
    });
};