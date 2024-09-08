const form = document.getElementById('resume-form');
const resumeContent = document.getElementById('resume-content');
const toggleButton = document.getElementById('toggle-skills');
const skillsSection = document.createElement('div');
const downloadButton = document.getElementById('download-resume');
const shareLink = document.getElementById('share-link');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const profilePictureInput = document.getElementById('profile-picture');
    const education = document.getElementById('education').value;
    const workExperience = document.getElementById('work-experience').value;
    const skills = document.getElementById('skills').value;
    
    const reader = new FileReader();
    reader.onload = async function() {
        const profilePictureURL = reader.result;
        resumeContent.innerHTML = `
            <h3>${name}</h3>
            <p>Email: ${email}</p>
            <img src="${profilePictureURL}" alt="Profile Picture">
            <h4>Education</h4>
            <p>${education}</p>
            <h4>Work Experience</h4>
            <p>${workExperience}</p>
        `;
        
        skillsSection.innerHTML = `
            <h4>Skills</h4>
            <p>${skills}</p>
        `;
        resumeContent.appendChild(skillsSection);

        // Generate unique URL
        const uniqueUrl = `https://${name}.vercel.app/resume`;
        shareLink.href = uniqueUrl;
        shareLink.textContent = uniqueUrl;
    };
    reader.readAsDataURL(profilePictureInput.files[0]);
});

toggleButton.addEventListener('click', () => {
    if (skillsSection.style.display === 'none' || skillsSection.style.display === '') {
        skillsSection.style.display = 'block';
    } else {
        skillsSection.style.display = 'none';
    }
});

downloadButton.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.html(resumeContent, {
        callback: function (doc) {
            doc.save('resume.pdf');
        },
        x: 10,
        y: 10
    });
});
