const postInput = document.getElementById('postInput');
const postBtn = document.getElementById('postBtn');
const postsContainer = document.querySelector('.posts');
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const uploadBtn = document.getElementById('uploadBtn');

let selectedImage = null; // store selected image

// Update button opacity
function updateButtonOpacity() {
    if (postInput.value.trim().length > 0 || selectedImage) {
        postBtn.classList.remove('opacity-20');
        postBtn.classList.add('opacity-100');
        postBtn.style.cursor = 'pointer';
    } else {
        postBtn.classList.remove('opacity-100');
        postBtn.classList.add('opacity-20');
        postBtn.style.cursor = 'default';
    }
}

// Open file selector when clicking image icon
uploadBtn.addEventListener('click', () => {
    imageInput.click();
});

// Handle image selection
imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            selectedImage = e.target.result;

            // Show preview
            imagePreview.innerHTML = `
                <img src="${selectedImage}" 
                     class="rounded-2xl max-h-60 border border-gray-600" />
            `;
            updateButtonOpacity();
        };
        reader.readAsDataURL(file);
    }
});

// Add post to feed
function addPostToFeed(content, img = null) {
    const newPost = document.createElement('div');
    newPost.className = "post border-[1px] border-x-0 border-x-gray-600 border-y-gray-600";

    newPost.innerHTML = `
        <div class="flex">
            <div class="image m-4">
                <img class="w-40 rounded-full"
                    src="https://pbs.twimg.com/profile_images/1921148972606824448/y5zBfpyM_bigger.jpg"
                    alt="">
            </div>
            <div class="content my-3">
                <span class="font-bold hover:underline cursor-pointer">You</span> 
                <span class="text-gray-500 cursor-pointer">@you · just now</span>
                <div>${content}</div>
                ${img ? `<div class="postimg m-4 ml-0">
                            <img src="${img}" class="flex rounded-2xl" />
                         </div>` : ""}
                <div class="icons flex justify-between w-[90%] text-gray-600 mx-3 mt-2">
                    <div class="icon flex items-center justify-center hover:text-blue-600 hover:cursor-pointer hover:bg-gray-900 hover:rounded-full p-1">
                        <span class="material-symbols-outlined">chat_bubble</span>0
                    </div>
                    <div class="icon flex items-center justify-center hover:text-green-600 hover:cursor-pointer hover:bg-gray-900 hover:rounded-full p-1">
                        <span class="material-symbols-outlined">repeat</span>0
                    </div>
                    <div class="icon flex items-center justify-center hover:text-pink-600 hover:cursor-pointer hover:bg-gray-900 hover:rounded-full p-1">
                        <span class="material-symbols-outlined">favorite</span>0
                    </div>
                    <div class="icon flex items-center justify-center hover:text-blue-600 hover:cursor-pointer hover:bg-gray-900 hover:rounded-full p-1">
                        <span class="material-symbols-outlined">bar_chart</span>0
                    </div>
                </div>
            </div>
        </div>
    `;

    postsContainer.prepend(newPost);
}

// Handle post button click
postBtn.addEventListener('click', function () {
    if (postInput.value.trim().length > 0 || selectedImage) {
        addPostToFeed(postInput.value, selectedImage);

        // Reset
        postInput.value = '';
        imagePreview.innerHTML = '';
        selectedImage = null;
        imageInput.value = ''; // reset file input
        updateButtonOpacity();
    }
});

// Handle enter key
postInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && (postInput.value.trim().length > 0 || selectedImage)) {
        postBtn.click();
    }
});

// Input watcher
postInput.addEventListener('input', updateButtonOpacity);
postInput.addEventListener('keyup', updateButtonOpacity);
