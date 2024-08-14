document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('toggle-theme');
    const header = document.querySelector('header');

    if (themeToggle) { // themeToggle'un var olup olmadığını kontrol ediyoruz
        themeToggle.addEventListener('click', function() {
            if (document.body.classList.contains('light-theme')) {
                document.body.classList.remove('light-theme');
                document.body.classList.add('dark-theme');
                header.style.backgroundImage = "url('static/myApp/images/resim_2024-08-12_143218113.jpg')";
            } else {
                document.body.classList.remove('dark-theme');
                document.body.classList.add('light-theme');
                header.style.backgroundImage = "url('static/myApp/images/night-sky-colorful-3840x2160-12510.jpg')";
            }
        });
    } else {
        console.error('Theme toggle button not found!');
    }

    const projectsContainer = document.getElementById('projects-container');
    const username = 'icsiee'; // GitHub kullanıcı adınızı buraya girin

    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => {
            projectsContainer.innerHTML = data.map(repo => {
                const createdDate = new Date(repo.created_at).toLocaleDateString();
                return `
                    <div class="project-card">
                        <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                        <p>Created: ${createdDate}</p>
                        <p>Stars: ${repo.stargazers_count}</p>
                    </div>
                `;
            }).join('');
        })
        .catch(error => {
            console.error('Error fetching GitHub repositories:', error);
            projectsContainer.innerHTML = '<p>Failed to load repositories.</p>';
        });
});
