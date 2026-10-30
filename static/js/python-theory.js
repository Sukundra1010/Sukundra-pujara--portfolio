// Original theory revision questions prepared for Sukundra Pujara.
// Answers use simple language and are rendered as safe text by script.js.
window.PYTHON_THEORY = [
  { section: "1. Introduction to Programming", questions: [
    ["What is programming?", "Programming means writing instructions that tell a computer how to do a task or solve a problem."],
    ["What is a program?", "A program is a set of instructions that a computer follows to do a job."],
    ["What is a programming language?", "A programming language is a way to write instructions for a computer. Python and JavaScript are examples."],
    ["Why do we use programming?", "We use programming to solve problems, make websites and apps, automate tasks, analyze data, and build games."],
    ["What is an algorithm?", "An algorithm is a clear set of steps for solving a problem."],
    ["What is a flowchart?", "A flowchart is a diagram that uses shapes and arrows to show the steps in a process."],
    ["What is debugging?", "Debugging means finding and fixing problems in a program."],
    ["What is software?", "Software is the programs and instructions that tell a computer what to do."],
    ["What is hardware?", "Hardware is the physical parts of a computer, such as a keyboard, screen, CPU, and memory."],
    ["What are the main steps of programming?", "Understand the problem, plan steps, write code, run it, test it, fix errors, and improve it."]
  ]},
  { section: "2. Introduction to Python", questions: [
    ["What is Python?", "Python is a general-purpose programming language with readable code."],
    ["Who created Python?", "Python was created by Guido van Rossum."],
    ["When was Python first released publicly?", "Python was first released publicly in 1991."],
    ["Why was Python created?", "Python was designed to be practical and readable, so people can write and maintain programs more easily."],
    ["Why do we use Python?", "Python is used for websites, automation, artificial intelligence, data science, testing, and many other tasks."],
    ["What are some features of Python?", "Python has readable syntax, dynamic typing, a large standard library, many packages, and automatic memory management."],
    ["What are common uses of Python?", "Python is used in web development, AI, machine learning, automation, data science, testing, and scientific computing."],
    ["What are advantages of Python?", "Python is readable, works on many operating systems, has many libraries, and has a large learning community."],
    ["What are some limits of Python?", "Some Python programs can run slower or use more memory than programs written in lower-level languages. Python is not the best choice for every device."],
    ["What is the extension of a Python source file?", "A Python source file usually ends in .py, such as main.py."]
  ]},
  { section: "3. Languages, Interpreters, and Tools", questions: [
    ["What is a compiler?", "A compiler translates source code into another form, often machine code, before a program runs."],
    ["What is an interpreter?", "An interpreter is a program or runtime that runs code by processing its instructions or an intermediate form."],
    ["What is the difference between a compiler and an interpreter?", "A compiler often translates code before it runs. An interpreter runs code through a runtime. Real systems can use both ideas: CPython compiles Python to bytecode and runs it in a virtual machine."],
    ["What is a high-level language?", "A high-level language uses ideas and words that are easier for people to read than machine instructions. Python is one example."],
    ["What is a low-level language?", "A low-level language is closer to the instructions a computer's processor uses. Assembly and machine code are examples."],
    ["What is the difference between high-level and low-level languages?", "High-level languages are usually easier to read and move between computers. Low-level languages are closer to hardware and can give more direct control."],
    ["What is source code?", "Source code is the readable code a programmer writes, such as print('Python')."],
    ["What is machine code?", "Machine code is a form of instructions that a computer's processor can execute directly."],
    ["What is bytecode?", "Bytecode is an intermediate form of code that a virtual machine or runtime can execute. CPython uses Python bytecode."],
    ["What is an IDE?", "An IDE is a tool that helps you write, run, and debug programs. VS Code, PyCharm, and IDLE are examples."]
  ]},
  { section: "4. Python Syntax and Variables", questions: [
    ["What is syntax?", "Syntax is the set of rules for writing valid code in a language."],
    ["What is indentation?", "Indentation is spaces at the start of a line. Python uses it to show which lines belong to a code block."],
    ["What is a comment?", "A comment is a note in code for people. Python normally ignores text after # on that line."],
    ["What is a variable?", "A variable is a name that refers to a value, such as name = 'Sukundra'."],
    ["What is a constant?", "A constant is a value that the programmer intends not to change. Python programmers commonly use uppercase names, such as PI."],
    ["What is an identifier?", "An identifier is a name used for a variable, function, class, or another part of a program."],
    ["What is a keyword?", "A keyword is a reserved word with a special meaning in Python, such as if, for, class, or return."],
    ["What is a built-in function?", "A built-in function comes with Python and can be used without importing it. print(), len(), and type() are examples."],
    ["What are input and output?", "Input is information given to a program. Output is information the program produces."],
    ["What is type conversion?", "Type conversion changes a value to another type, such as converting '100' to the integer 100 with int()."]
  ]},
  { section: "5. Data Types and Operators", questions: [
    ["What is a data type?", "A data type describes what kind of value something is."],
    ["What are common Python data types?", "int is a whole number, float is a decimal, str is text, bool is True or False, list is a changeable sequence, tuple is a fixed sequence, set keeps unique values, dict maps keys to values, and None means no value."],
    ["What are operators?", "Operators are symbols or words that do something with values, such as adding numbers or comparing values."],
    ["What are arithmetic operators?", "Arithmetic operators do maths: + adds, - subtracts, * multiplies, / divides, // divides into whole-number steps, % finds a remainder, and ** raises a power."],
    ["What is the difference between = and ==?", "= assigns a value to a name. == checks whether two values are equal."],
    ["What is the difference between is and ==?", "== compares values. is checks whether two names refer to the very same object."],
    ["What are logical operators?", "and is true when both checks are true; or is true when at least one is true; not reverses a truth value."],
    ["What is type casting?", "Type casting is explicitly changing a value's type with functions such as int(), float(), or str()."]
  ]},
  { section: "6. Conditions and Loops", questions: [
    ["What is a conditional statement?", "A conditional statement lets a program choose what code to run based on a check."],
    ["What is the difference between if, elif, and else?", "if checks first. elif checks another condition if earlier ones were false. else runs when none of the earlier conditions were true."],
    ["What is a loop?", "A loop repeats a block of code."],
    ["What is the difference between for and while loops?", "A for loop commonly visits items one at a time. A while loop repeats as long as its condition is true."],
    ["What is range()?", "range() gives a sequence of numbers, often for a loop. range(1, 4) gives 1, 2, and 3; it stops before 4."],
    ["What is the difference between break, continue, and pass?", "break exits a loop. continue skips to its next turn. pass does nothing and is used as a placeholder."]
  ]},
  { section: "7. Data Structures", questions: [
    ["What is a list?", "A list is an ordered collection that you can change and that can contain repeated values. Example: [10, 20, 30]."],
    ["What is a tuple?", "A tuple is an ordered collection that cannot be changed in place after it is created. Example: (10, 20)."],
    ["What is a set?", "A set is a collection of unique values. It is useful for removing duplicates."],
    ["What is a dictionary?", "A dictionary stores key-value pairs, such as {'name': 'Sukundra'}."],
    ["What is the difference between list, tuple, set, and dictionary?", "A list is ordered and changeable. A tuple is ordered and fixed. A set keeps unique values. A dictionary maps keys to values."],
    ["What is the difference between append() and extend()?", "append() puts one item at the end of a list. extend() adds each item from another iterable."],
    ["What are mutable and immutable objects?", "Mutable objects can be changed in place, such as lists and dictionaries. Immutable objects cannot be changed in place, such as integers and strings."]
  ]},
  { section: "8. Functions and Modules", questions: [
    ["What is a function?", "A function is a reusable block of code that does a task."],
    ["What is a parameter?", "A parameter is a named input written in a function definition."],
    ["What is an argument?", "An argument is the actual value given to a function when it is called."],
    ["What is the difference between print() and return?", "print() shows information. return sends a value back to the code that called the function."],
    ["What is recursion?", "Recursion is when a function calls itself to solve a smaller problem. It needs a base case that stops the calls."],
    ["What is a lambda function?", "A lambda is a small function written as one expression, often for a short task."],
    ["What is a module?", "A module is a Python file with reusable code, such as functions, classes, or values."],
    ["What is a package?", "A package is a folder that groups related Python modules."],
    ["What is a library?", "A library is a collection of reusable code that helps with tasks. NumPy, pandas, and Matplotlib are examples."]
  ]},
  { section: "9. Object-Oriented Programming", questions: [
    ["What is OOP?", "Object-oriented programming organizes code around objects that contain data and behavior."],
    ["What is a class?", "A class is a plan for creating objects."],
    ["What is an object?", "An object is one instance created from a class."],
    ["What is __init__()?", "__init__() is a special method commonly used to set up an object's starting values."],
    ["What is self?", "self refers to the current object in an instance method. It lets the method use that object's data and methods."],
    ["What is inheritance?", "Inheritance lets one class reuse or extend behavior from another class."],
    ["What is polymorphism?", "Polymorphism means different kinds of objects can use the same method name and do their own behavior."],
    ["What is encapsulation?", "Encapsulation keeps data and related methods together and helps control how the object's data is changed."],
    ["What is abstraction?", "Abstraction shows the important actions and hides details that the user does not need."],
    ["What is a simple OOP example?", "A Student class can store a student's name and have an introduce() method. Calling the method on a Student object can print the name."]
  ]},
  { section: "10. Errors, Exceptions, and Files", questions: [
    ["What is a syntax error?", "A syntax error happens when code does not follow Python's writing rules."],
    ["What is a runtime error?", "A runtime error happens while the program is running, such as trying to divide by zero."],
    ["What is a logical error?", "A logical error is when a program runs but gives the wrong answer because the steps are wrong."],
    ["What is exception handling?", "Exception handling lets a program respond to expected errors using try, except, else, and finally."],
    ["What is file handling?", "File handling means creating, reading, writing, or adding information to files."],
    ["What are common file modes?", "r reads, w writes and replaces old content, a adds to the end, and x creates a new file but fails if it already exists."],
    ["What is a context manager?", "A context manager manages a resource and cleans it up. The with statement is commonly used to open and automatically close a file."]
  ]},
  { section: "11. Advanced Python and Development", questions: [
    ["What is an iterator?", "An iterator gives values one at a time, usually when next() is called."],
    ["What is a generator?", "A generator gives values one at a time, often using yield, instead of making the whole sequence at once."],
    ["What is a decorator?", "A decorator is a callable that adds behavior to a function or class without changing its original code directly."],
    ["What is a list comprehension?", "A list comprehension is a short way to make a new list from an iterable, such as [x * x for x in range(5)]."],
    ["What is *args?", "*args lets a function accept extra positional arguments, collected into a tuple."],
    ["What is **kwargs?", "**kwargs lets a function accept extra named arguments, collected into a dictionary."],
    ["What is a virtual environment?", "A virtual environment is an isolated Python environment that keeps one project's installed packages separate from others."],
    ["What is a database?", "A database is an organized place to store information so it can be found and changed."],
    ["What is an API?", "An API is a set of rules that lets software parts communicate or use each other's features."],
    ["What is a framework?", "A framework is a reusable structure and set of tools for building an application. Flask and Django are Python examples."],
    ["What is a testing framework?", "A testing framework provides tools to write and run checks that see whether software works as expected."],
    ["What is time complexity?", "Time complexity describes how an algorithm's running time grows as its input gets bigger."],
    ["What is version control?", "Version control tracks changes to files over time and helps people work together. Git is a popular system."]
  ]},
  { section: "12. Useful Built-in Functions and Ideas", questions: [
    ["What does len() do?", "len() returns how many items are in an object."],
    ["What does type() do?", "type() tells you the type of an object."],
    ["What does input() do?", "input() reads what a person types and returns it as text."],
    ["What does int() do?", "int() converts a suitable value to a whole number."],
    ["What does float() do?", "float() converts a suitable value to a decimal number."],
    ["What does str() do?", "str() converts a suitable value to text."],
    ["What does sum() do?", "sum() adds the numbers in an iterable."],
    ["What does max() do?", "max() returns the largest item from values or an iterable."],
    ["What does min() do?", "min() returns the smallest item from values or an iterable."],
    ["What does None mean?", "None is a special Python value that means there is no value."],
    ["What is a Boolean value?", "A Boolean value is either True or False."],
    ["What is the difference between a bug and debugging?", "A bug is a problem in a program. Debugging is the work of finding and fixing it."],
    ["What is open-source software?", "Open-source software shares its source code under a license that permits certain uses, study, changes, and sharing."],
    ["What is cross-platform software?", "Cross-platform software can run on more than one operating system, sometimes with small changes."],
    ["What is automation?", "Automation uses software to do tasks with less manual work."]
  ]}
];
