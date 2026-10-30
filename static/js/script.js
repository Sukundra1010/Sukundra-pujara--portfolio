// Interactive controls for the self-contained Python notes curriculum.
document.addEventListener("DOMContentLoaded", () => {
  const lessons = window.PYTHON_LESSONS;
  const lessonList = document.querySelector("#lesson-list");
  if (!Array.isArray(lessons) || !lessonList) return;

  const search = document.querySelector("#lesson-search");
  const categoryFilter = document.querySelector("#category-filter");
  const levelFilter = document.querySelector("#level-filter");
  const progressCount = document.querySelector("#progress-count");
  const progressPercent = document.querySelector("#progress-percent");
  const progressFill = document.querySelector("#progress-fill");
  const progressTrack = document.querySelector(".progress-track");
  const lessonCount = document.querySelector("#lesson-count");
  const previousButton = document.querySelector("#previous-lesson");
  const nextButton = document.querySelector("#next-lesson");
  const practiceTopics = window.PYTHON_PRACTICE || [];
  const theorySections = window.PYTHON_THEORY || [];
  const completedKey = "pythonNotesCompleted:v1";
  const quizKey = "pythonNotesQuizBest:v1";
  let completed = loadCompleted();
  let visibleIndexes = [];
  let activeIndex = -1;

  function loadCompleted() {
    try {
      const saved = JSON.parse(localStorage.getItem(completedKey) || "[]");
      return new Set(Array.isArray(saved) ? saved.filter(Number.isInteger) : []);
    } catch (error) {
      console.error("Could not read lesson progress from this browser.", error);
      showStorageWarning();
      return new Set();
    }
  }

  function saveCompleted() {
    try {
      localStorage.setItem(completedKey, JSON.stringify([...completed]));
      return true;
    } catch (error) {
      console.error("Could not save lesson progress in this browser.", error);
      showStorageWarning();
      return false;
    }
  }

  function showStorageWarning() {
    const warning = document.querySelector("#storage-warning");
    if (warning) warning.hidden = false;
  }

  function updateProgress() {
    const amount = completed.size;
    const percentage = Math.round((amount / lessons.length) * 100);
    progressCount.textContent = `${amount} of ${lessons.length} lessons completed`;
    progressPercent.textContent = `${percentage}%`;
    progressFill.style.width = `${percentage}%`;
    progressTrack.setAttribute("aria-valuenow", String(amount));
  }

  function addText(parent, tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    element.textContent = text;
    parent.append(element);
    return element;
  }

  function makeLessonCard(lesson, index) {
    const article = document.createElement("article");
    article.className = "lesson-card";
    article.id = `lesson-${index + 1}`;
    if (completed.has(index)) article.classList.add("is-complete");

    const details = document.createElement("details");
    details.open = index === activeIndex;
    const summary = document.createElement("summary");
    const title = document.createElement("span");
    title.className = "lesson-title";
    title.textContent = lesson.title;
    const meta = document.createElement("span");
    meta.className = "lesson-meta";
    meta.textContent = `${lesson.category} · ${lesson.level.split("·")[0].trim()}`;
    summary.append(title, meta);
    details.append(summary);

    const body = document.createElement("div");
    body.className = "lesson-body";
    addText(body, "p", "lesson-explanation", lesson.explain);

    addText(body, "h3", "", "Example with line-by-line comments");
    const code = document.createElement("pre");
    const codeText = document.createElement("code");
    codeText.textContent = lesson.code;
    code.append(codeText);
    body.append(code);

    addText(body, "h3", "", "Expected output");
    const output = document.createElement("pre");
    output.className = "expected-output";
    const outputText = document.createElement("code");
    outputText.textContent = lesson.output;
    output.append(outputText);
    body.append(output);

    addText(body, "h3", "", "Common mistake to avoid");
    addText(body, "p", "lesson-tip", lesson.mistake);
    if (lesson.theory) {
      addText(body, "h3", "", "Additional built-in types");
      addText(body, "p", "lesson-explanation", lesson.theory);
    }
    if (lesson.commonRules) {
      addText(body, "h3", "", "Important rules");
      const rules = document.createElement("ul");
      rules.className = "lesson-rules";
      lesson.commonRules.split("\n").forEach((rule) => {
        addText(rules, "li", "", rule.replace(/^- /, ""));
      });
      body.append(rules);
    }
    if (lesson.loopRules) {
      addText(body, "h3", "", "For loop key points");
      const rules = document.createElement("ul");
      rules.className = "lesson-rules";
      lesson.loopRules.split("\n").forEach((rule) => {
        addText(rules, "li", "", rule.replace(/^- /, ""));
      });
      body.append(rules);
    }
    if (lesson.loopControlCode) {
      addText(body, "h3", "", "break, continue, and loop else");
      const controls = document.createElement("pre");
      const controlsText = document.createElement("code");
      controlsText.textContent = lesson.loopControlCode;
      controls.append(controlsText);
      body.append(controls);
      addText(body, "h3", "", "Expected output");
      const controlsOutput = document.createElement("pre");
      controlsOutput.className = "expected-output";
      const controlsOutputText = document.createElement("code");
      controlsOutputText.textContent = lesson.loopControlOutput;
      controlsOutput.append(controlsOutputText);
      body.append(controlsOutput);
    }
    if (lesson.typeExamplesCode) {
      addText(body, "h3", "", "Python data type examples");
      const typeExamples = document.createElement("pre");
      const typeExamplesText = document.createElement("code");
      typeExamplesText.textContent = lesson.typeExamplesCode;
      typeExamples.append(typeExamplesText);
      body.append(typeExamples);
    }
    if (lesson.typeCheckCode) {
      addText(body, "h3", "", "Check the data types with type()");
      const typeCheck = document.createElement("pre");
      const typeCheckText = document.createElement("code");
      typeCheckText.textContent = lesson.typeCheckCode;
      typeCheck.append(typeCheckText);
      body.append(typeCheck);
    }
    if (lesson.completeCode) {
      addText(body, "h3", "", "Complete practice program");
      const complete = document.createElement("pre");
      const completeText = document.createElement("code");
      completeText.textContent = lesson.completeCode;
      complete.append(completeText);
      body.append(complete);
    }

    addText(body, "h3", "", "Practice challenge");
    addText(body, "p", "challenge-question", lesson.challenge);
    const answerButton = document.createElement("button");
    answerButton.className = "button button-outline answer-toggle";
    answerButton.type = "button";
    answerButton.textContent = "Show answer";
    const answer = document.createElement("pre");
    answer.className = "challenge-answer";
    answer.hidden = true;
    const answerCode = document.createElement("code");
    answerCode.textContent = lesson.answer;
    answer.append(answerCode);
    answerButton.addEventListener("click", () => {
      answer.hidden = !answer.hidden;
      answerButton.textContent = answer.hidden ? "Show answer" : "Hide answer";
    });
    body.append(answerButton, answer);

    details.append(body);
    details.addEventListener("toggle", () => {
      if (details.open) {
        activeIndex = index;
        updateNavigation();
      }
    });
    const completeLabel = document.createElement("label");
    completeLabel.className = "complete-control";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed.has(index);
    checkbox.setAttribute("aria-label", `Mark ${lesson.title} as completed`);
    const completeText = document.createElement("span");
    completeText.textContent = "Completed";
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) completed.add(index);
      else completed.delete(index);
      article.classList.toggle("is-complete", checkbox.checked);
      if (saveCompleted()) updateProgress();
    });
    completeLabel.append(checkbox, completeText);
    article.append(details, completeLabel);
    return article;
  }

  function makePracticeTopic(topic, topicIndex) {
    const article = document.createElement("article");
    article.className = "practice-topic";
    article.dataset.category = topic.category;
    article.dataset.level = topic.level;
    article.dataset.search = `${topic.title} ${topic.explain}`.toLowerCase();

    const details = document.createElement("details");
    const summary = document.createElement("summary");
    const title = document.createElement("span");
    title.className = "lesson-title";
    title.textContent = topic.title;
    const meta = document.createElement("span");
    meta.className = "lesson-meta";
    meta.textContent = `${topic.category} · 5 questions`;
    summary.append(title, meta);
    details.append(summary);

    const body = document.createElement("div");
    body.className = "lesson-body";
    addText(body, "p", "lesson-explanation", topic.explain);
    addText(body, "h3", "", "Worked example");
    const example = document.createElement("pre");
    const exampleCode = document.createElement("code");
    exampleCode.textContent = topic.code;
    example.append(exampleCode);
    body.append(example);
    addText(body, "h3", "", "Expected output");
    const output = document.createElement("pre");
    output.className = "expected-output";
    const outputCode = document.createElement("code");
    outputCode.textContent = topic.output;
    output.append(outputCode);
    body.append(output);
    addText(body, "p", "lesson-tip", `Common mistake: ${topic.mistake}`);
    addText(body, "h3", "", "Practice questions");

    const questions = document.createElement("ol");
    questions.className = "practice-questions";
    topic.questions.forEach((item, questionIndex) => {
      const question = document.createElement("li");
      question.className = "practice-question";
      const difficulty = questionIndex < 3 ? "Easy" : questionIndex === 3 ? "Easy+" : "Challenge";
      addText(question, "p", "practice-prompt", `Question ${questionIndex + 1} · ${difficulty} — ${item.question}`);
      if (item.input) addText(question, "p", "practice-io", `Example input: ${item.input}`);
      addText(question, "p", "practice-hint", `Hint: ${item.hint}`);
      const answerButton = document.createElement("button");
      answerButton.type = "button";
      answerButton.className = "button button-outline answer-toggle";
      answerButton.textContent = "Show Answer";
      const answer = document.createElement("div");
      answer.className = "practice-answer";
      answer.hidden = true;
      const answerCode = document.createElement("pre");
      const answerText = document.createElement("code");
      answerText.textContent = item.solution;
      answerCode.append(answerText);
      answer.append(answerCode);
      if (item.output) addText(answer, "p", "practice-io", `Expected output: ${item.output}`);
      addText(answer, "p", "answer-explanation", item.explanation);
      answerButton.addEventListener("click", () => {
        answer.hidden = !answer.hidden;
        answerButton.textContent = answer.hidden ? "Show Answer" : "Hide Answer";
      });
      question.append(answerButton, answer);
      questions.append(question);
    });
    body.append(questions);
    details.append(body);
    article.append(details);
    article.dataset.topicIndex = String(topicIndex);
    return article;
  }

  function renderPractice() {
    const coreList = document.querySelector("#core-practice-list");
    const oopList = document.querySelector("#oop-practice-list");
    if (!coreList || !oopList) return;
    coreList.replaceChildren();
    oopList.replaceChildren();
    const query = search.value.trim().toLowerCase();
    const category = categoryFilter.value;
    const level = levelFilter.value;
    let coreCount = 0;
    let oopCount = 0;

    practiceTopics.forEach((topic, index) => {
      const matchesSearch = !query || `${topic.title} ${topic.explain} ${topic.questions.map((item) => item.question).join(" ")}`.toLowerCase().includes(query);
      const matchesCategory = category === "all" || topic.category === category;
      const matchesLevel = level === "all" || topic.level === level;
      if (!matchesSearch || !matchesCategory || !matchesLevel) return;
      const card = makePracticeTopic(topic, index);
      if (topic.oop) {
        oopList.append(card);
        oopCount += 1;
      } else {
        coreList.append(card);
        coreCount += 1;
      }
    });
    if (!coreCount) addText(coreList, "p", "empty-state", "No core practice topics match these filters.");
    if (!oopCount) addText(oopList, "p", "empty-state", "No OOP topics match these filters.");
  }

  function renderQuiz() {
    const form = document.querySelector("#quiz-form");
    if (!form || !Array.isArray(window.PYTHON_QUIZ)) return;
    form.replaceChildren();
    window.PYTHON_QUIZ.forEach((item, index) => {
      const fieldset = document.createElement("fieldset");
      fieldset.className = "quiz-question";
      const legend = document.createElement("legend");
      legend.textContent = `Question ${index + 1}. ${item.question}`;
      fieldset.append(legend);
      item.choices.forEach((choice, choiceIndex) => {
        const label = document.createElement("label");
        label.className = "quiz-choice";
        const input = document.createElement("input");
        input.type = "radio";
        input.name = `quiz-${index}`;
        input.value = String(choiceIndex);
        const text = document.createElement("span");
        text.textContent = choice;
        label.append(input, text);
        fieldset.append(label);
      });
      addText(fieldset, "p", "quiz-feedback", "");
      form.append(fieldset);
    });
    updateBestQuizScore();
  }

  function renderTheory() {
    const list = document.querySelector("#theory-list");
    const searchInput = document.querySelector("#theory-search");
    const count = document.querySelector("#theory-count");
    if (!list || !searchInput || !count) return;
    const query = searchInput.value.trim().toLowerCase();
    const matchingSections = [];
    let visibleQuestions = 0;

    theorySections.forEach((section) => {
      const questions = section.questions.filter(([question, answer]) =>
        !query || `${question} ${answer} ${section.section}`.toLowerCase().includes(query));
      if (questions.length) {
        matchingSections.push({ section: section.section, questions });
        visibleQuestions += questions.length;
      }
    });

    list.replaceChildren();
    matchingSections.forEach((section) => {
      const details = document.createElement("details");
      details.className = "theory-group";
      const summary = document.createElement("summary");
      summary.textContent = section.section;
      const items = document.createElement("div");
      items.className = "theory-questions";
      section.questions.forEach(([questionText, answerText]) => {
        const item = document.createElement("details");
        item.className = "theory-item";
        const question = document.createElement("summary");
        question.textContent = questionText;
        const answer = document.createElement("p");
        answer.textContent = answerText;
        item.append(question, answer);
        items.append(item);
      });
      details.append(summary, items);
      list.append(details);
    });

    if (!visibleQuestions) addText(list, "p", "empty-state", "No theory questions match your search.");
    count.textContent = `Showing ${visibleQuestions} of 115 theory questions`;
  }

  function updateBestQuizScore() {
    const bestLabel = document.querySelector("#quiz-best-score");
    if (!bestLabel) return;
    try {
      const best = Number(localStorage.getItem(quizKey));
      bestLabel.textContent = Number.isFinite(best) && best > 0
        ? `Best score: ${best} / ${window.PYTHON_QUIZ.length}`
        : "Best score: not taken yet";
    } catch (error) {
      console.error("Could not read the saved quiz score.", error);
      showStorageWarning();
    }
  }

  function submitQuiz() {
    const form = document.querySelector("#quiz-form");
    const questions = window.PYTHON_QUIZ || [];
    let score = 0;
    questions.forEach((item, index) => {
      const fieldset = form.querySelectorAll(".quiz-question")[index];
      const selected = form.querySelector(`input[name="quiz-${index}"]:checked`);
      const feedback = fieldset.querySelector(".quiz-feedback");
      const isCorrect = selected && Number(selected.value) === item.answer;
      if (isCorrect) score += 1;
      fieldset.classList.toggle("quiz-correct", Boolean(isCorrect));
      fieldset.classList.toggle("quiz-incorrect", !isCorrect);
      feedback.textContent = isCorrect
        ? "Correct!"
        : `Review: the answer is ${item.choices[item.answer]}.`;
    });
    const result = document.querySelector("#quiz-result");
    result.textContent = `Your score: ${score} / ${questions.length}`;
    document.querySelector("#submit-quiz").hidden = true;
    document.querySelector("#retry-quiz").hidden = false;
    try {
      const currentBest = Number(localStorage.getItem(quizKey)) || 0;
      if (score > currentBest) localStorage.setItem(quizKey, String(score));
      updateBestQuizScore();
    } catch (error) {
      console.error("Could not save your quiz score.", error);
      showStorageWarning();
    }
  }

  function resetQuiz() {
    document.querySelector("#quiz-form").reset();
    document.querySelectorAll(".quiz-question").forEach((fieldset) => {
      fieldset.classList.remove("quiz-correct", "quiz-incorrect");
      fieldset.querySelector(".quiz-feedback").textContent = "";
    });
    document.querySelector("#quiz-result").textContent = "";
    document.querySelector("#submit-quiz").hidden = false;
    document.querySelector("#retry-quiz").hidden = true;
  }

  function setupTheme() {
    const toggle = document.querySelector(".theme-toggle");
    if (!toggle) return;
    let theme = "dark";
    try {
      theme = localStorage.getItem("pythonNotesTheme") === "light" ? "light" : "dark";
    } catch (error) {
      console.error("Could not read the saved theme preference.", error);
    }
    const applyTheme = () => {
      document.documentElement.dataset.theme = theme;
      toggle.textContent = theme === "dark" ? "☀ Light" : "☾ Dark";
      toggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
    };
    toggle.addEventListener("click", () => {
      theme = theme === "dark" ? "light" : "dark";
      applyTheme();
      try {
        localStorage.setItem("pythonNotesTheme", theme);
      } catch (error) {
        console.error("Could not save the theme preference.", error);
        showStorageWarning();
      }
    });
    applyTheme();
  }

  function updateNavigation() {
    const position = visibleIndexes.indexOf(activeIndex);
    previousButton.disabled = visibleIndexes.length === 0 || position <= 0;
    nextButton.disabled = visibleIndexes.length === 0 || position < 0 || position >= visibleIndexes.length - 1;
  }

  function renderLessons() {
    const query = search.value.trim().toLowerCase();
    const category = categoryFilter.value;
    const level = levelFilter.value;
    visibleIndexes = lessons
      .map((lesson, index) => ({ lesson, index }))
      .filter(({ lesson }) => {
        const matchesSearch = !query || `${lesson.title} ${lesson.explain}`.toLowerCase().includes(query);
        const matchesCategory = category === "all" || lesson.category === category;
        const matchesLevel = level === "all" || lesson.level === level;
        return matchesSearch && matchesCategory && matchesLevel;
      })
      .map(({ index }) => index);

    if (visibleIndexes.length && !visibleIndexes.includes(activeIndex)) {
      activeIndex = visibleIndexes[0];
    }
    if (!visibleIndexes.length) activeIndex = -1;
    lessonList.replaceChildren();
    if (!visibleIndexes.length) {
      addText(lessonList, "p", "empty-state", "No lessons match your search. Try another topic or clear the filters.");
    } else {
      visibleIndexes.forEach((index) => lessonList.append(makeLessonCard(lessons[index], index)));
    }
    lessonCount.textContent = `Showing ${visibleIndexes.length} of ${lessons.length} lessons`;
    updateNavigation();
    renderPractice();
  }

  function goToLesson(direction) {
    const position = visibleIndexes.indexOf(activeIndex);
    const newPosition = position + direction;
    if (newPosition < 0 || newPosition >= visibleIndexes.length) return;
    activeIndex = visibleIndexes[newPosition];
    renderLessons();
    const card = document.querySelector(`#lesson-${activeIndex + 1}`);
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "start" });
      card.querySelector("details").open = true;
    }
    updateNavigation();
  }

  [...new Set(lessons.map((lesson) => lesson.level))].forEach((level) => {
    const option = document.createElement("option");
    option.value = level;
    option.textContent = level;
    levelFilter.append(option);
  });

  search.addEventListener("input", renderLessons);
  document.querySelector("#theory-search").addEventListener("input", renderTheory);
  categoryFilter.addEventListener("change", renderLessons);
  levelFilter.addEventListener("change", renderLessons);
  document.querySelector("#clear-filters").addEventListener("click", () => {
    search.value = "";
    categoryFilter.value = "all";
    levelFilter.value = "all";
    activeIndex = -1;
    renderLessons();
    search.focus();
  });
  previousButton.addEventListener("click", () => goToLesson(-1));
  nextButton.addEventListener("click", () => goToLesson(1));
  document.querySelector("#submit-quiz").addEventListener("click", submitQuiz);
  document.querySelector("#retry-quiz").addEventListener("click", resetQuiz);

  document.querySelectorAll(".lesson-level-link").forEach((link) => {
    link.addEventListener("click", () => {
      levelFilter.value = link.dataset.level;
      search.value = "";
      categoryFilter.value = "all";
      activeIndex = -1;
      renderLessons();
    });
  });

  updateProgress();
  setupTheme();
  renderQuiz();
  renderTheory();
  renderLessons();
});
