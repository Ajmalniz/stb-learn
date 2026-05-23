# STB Learn

A free, static web-based learning platform for students following the **Sindh Textbook Board (STB)** curriculum for Class 9 and Class 10.

## About

STB Learn provides beginner-friendly, topic-by-topic notes for all major subjects. Each chapter is broken into individual topic pages with clear explanations, examples, and fully solved exercises — no login or internet connection required after downloading.

## Subjects Covered

| Subject | Class 9 | Class 10 |
|---------|---------|----------|
| Biology | 9 chapters | 9 chapters |
| Chemistry | 8 chapters | 8 chapters |
| Physics | 9 chapters | 9 chapters |
| Mathematics | 9 chapters | 9 chapters |
| English | 8 chapters | 8 chapters |

## Features

- Topic-by-topic breakdown for every chapter
- Solved exercises (MCQs, short answers, long answers)
- Progress tracking using browser localStorage — no account needed
- Mobile-responsive design
- Subject colour-coded themes
- Works entirely offline as a static site

## Project Structure

```
index.html                          ← Landing page
css/
  styles.css                        ← Global stylesheet
js/
  main.js                           ← Navigation & UI
  progress.js                       ← Progress tracking
  quiz.js                           ← Quiz engine
courses/
  biology/
    class9/
      index.html                    ← Course overview
      chapter1/
        index.html                  ← Chapter overview
        topic1.html ... topicN.html ← Individual topic pages
        exercises.html              ← Solved exercises
    class10/
  chemistry/
  physics/
  maths/
  english/
```

## How to Use

1. Clone or download this repository
2. Open `index.html` in any modern browser
3. No build step, no server, no dependencies required

## Curriculum

All content is aligned with the **Sindh Textbook Board (STB)** syllabus for Class 9 and Class 10, as taught in schools across Sindh, Pakistan.

## Status

Currently in active development. Biology Class 9 Chapter 1 is complete. Remaining chapters and courses are being built one chapter at a time.
