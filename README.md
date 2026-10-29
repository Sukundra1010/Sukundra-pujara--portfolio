# Sukundra Pujara — Portfolio

A static, responsive portfolio built only with HTML, CSS, and JavaScript. No Python,
server, database, or package installation is required. The supplied genuine profile
photo is at `static/images/profile.jpg`.

## Run using VS Code on Windows

1. Open this folder in VS Code.
2. Open `index.html` in a browser. You can also install the **Live Server** extension,
   right-click `index.html`, and choose **Open with Live Server**.

The site can be viewed without a server; Live Server is recommended for a smoother
local development experience.

## Pages

- `index.html` — About, skills, projects, education, certificates, CV download,
  and notes preview.
- `projects.html` — Project list.
- `calculator.html` — Working four-operation calculator with keyboard support.
- `notes.html` — Interactive Python Notes: Basic to Advanced curriculum with 85
  lesson cards, explanations, commented examples, expected outputs, common
  mistakes, challenges, search, filters, and saved lesson progress. It also
  includes 115 searchable theory questions and answers, topic-wise beginner
  practice, a dedicated OOP practice section, and a scored quiz.
- `contact.html` — Contact details and an email-app form.
- `admin.html` — Browser-local project and note editor.
- `static/files/sukundra-pujara-cv.pdf` — Two-page CV made from the supplied
  résumé images. The portfolio homepage provides a download button and a link
  to open the PDF in a new tab.

## Browser-only limitations

The contact form opens the visitor's default email program with the message filled
in. The visitor still needs to send the email. It does not store or send messages
automatically.

Projects and notes added in the content manager are saved in that browser's
`localStorage`; they are not published to other visitors or synced to another
device. Anyone who can open the page in that browser can use the editor. A static
HTML site cannot securely protect an admin dashboard or share edits with visitors.
Those features require a server or a content-management service.

Python lesson completion is also saved in the current browser using `localStorage`.
The Python notes and the optional external OOP resource link do not call a backend
or external API for lesson content.

The calculator project runs entirely in the browser and does not use a backend.

To replace your profile photo, replace `static/images/profile.jpg` with your own
image using the same filename.
