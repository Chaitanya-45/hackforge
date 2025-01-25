import React, { useState } from 'react';
import './Commstyle.css';

function CommunityPage() {
    const [posts, setPosts] = useState([]);

    const addPost = (event) => {
        event.preventDefault();
        
        const title = event.target.title.value;
        const author = event.target.author.value;
        const content = event.target.content.value;

        if (!title || !author || !content) {
            alert("Please fill in all fields.");
            return;
        }

        // Add the new post to the list
        setPosts([...posts, { title, author, content }]);

        // Clear the form
        event.target.reset();
    };

    return (
        <div>
            <section className="abheader">
                <div className="abtext-box">
                    <h1 style={{ paddingTop: '30px', fontSize: '50px' }}>Empowering Health: Our Community Hub</h1>
                </div>
            </section>

            <section className="add-post" style={{ textAlign: 'center' }}>
                <h2>Add New Post</h2>
                <form id="post-form" onSubmit={(event) => addPost(event)} style={{ maxWidth: '500px', margin: 'auto' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="post-title" style={{ display: 'block' }}>Title:</label>
                        <input type="text" id="post-title" name="title" placeholder="Enter the post title" style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="post-author" style={{ display: 'block' }}>Author:</label>
                        <input type="text" id="post-author" name="author" placeholder="Enter your name" style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="post-content" style={{ display: 'block' }}>Content:</label>
                        <textarea id="post-content" name="content" placeholder="Write your post content here" style={{ width: '100%', height: '150px', padding: '8px' }}></textarea>
                    </div>
                    <div>
                        <button type="submit" style={{ backgroundColor: '#88e2e8', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>Add Post</button>
                    </div>
                </form>
            </section>

            <section className="blogs" id="new-post-section">
                <br /><br />
                {posts.length > 0 ? (
                    posts.map((post, index) => (
                        <div className="blog" id="new-post" key={index} style={{ marginBottom: '20px' }}>
                            <h3>{post.title}</h3>
                            <p><strong>Author:</strong> {post.author}</p>
                            <p>{post.content}</p>
                        </div>
                    ))
                ) : (
                    <p>No posts yet.</p>
                )}
                <br />
            </section>
        </div>
    );
}

export default CommunityPage;
