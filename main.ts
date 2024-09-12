// script.ts
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeContent = document.getElementById('resume-content') as HTMLDivElement;
const toggleButton = document.getElementById('toggle-skills') as HTMLButtonElement;
const skillsSection = document.createElement('div');
const downloadButton = document.getElementById('download-resume') as HTMLButtonElement;


form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const profilePictureInput = document.getElementById('profile-picture') as HTMLInputElement;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const workExperience = (document.getElementById('work-experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
    
    const reader = new FileReader();
    reader.onload = function() {
        const profilePictureURL = reader.result as string;
        resumeContent.innerHTML = `
            <h3>${name}</h3>
            <p>Email: ${email}</p>
            <img src="${profilePictureURL}" alt="Profile Picture" style="width:150px;height:150px;border-radius:50%;">
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
    };
    reader.readAsDataURL(profilePictureInput.files[0]);
});

toggleButton.addEventListener('click', () => {
    if (skillsSection.style.display === 'none') {
        skillsSection.style.display = 'block';
    } else {
        skillsSection.style.display = 'none';
    }
});
downloadButton.addEventListener('click', () => {
    const element = document.createElement('a');
    const file = new Blob([resumeContent.innerHTML], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = 'resume.html';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
});
