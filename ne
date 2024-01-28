:root {
	--clr-primary: rgb(54, 112, 199);
	--clr-light: #f4f4f4;
	--clr-dark: #333;
	--clr-warning: rgb(99, 36, 36);
}
*,
*::before,
*::after {
	font-family: inherit;
	box-sizing: border-box;
}
body {
	margin: 0;
	font-family: "Work Sans" sans-serif;
	font-weight: 300;
	font-size: 1.5rem;
	background-color: var(--clr-primary);
	color: var(--clr-light);
	display: grid;
	grid:
		"header header header header" auto
		"...... lists  active ......" auto /
		1fr minmax(100px, 300px) minmax(250px, 500px) 1fr;
}
.title {
	grid-area: header;
	text-align: center;
	font-size: calc(7vw + 2rem);
	font-weight: 900;
	color: rgba(0, 0, 0, 0.1);
	letter-spacing: 1px;
	margin: -0.3em 0 0.5em;
}
.all-tasks {
	grid-area: lists;
}
.task-list {
	line-height: 1.7;
	font-size: 1.2rem;
	list-style: circle;
	padding-left: 1.1rem;
}
.list-name {
	cursor: pointer;
}
.list-name:hover {
	opacity: 0.7;
}
form {
	display: flex;
}
.btn {
	cursor: pointer;
	background: 0;
	border: 0;
	padding: 0;
	color: inherit;
}
.btn.create {
	font-size: 1.5rem;
	font-weight: 900;
	margin-right: 0.25em;

	transition: opacity 250ms ease-in;
}
.btn.create:hover {
	opacity: 0.7;
}
.new {
	background: transparent;
	border: 0;
	color: inherit;
	border-bottom: 1px solid currentColor;
	font-size: inherit;
	outline: none;
	transition: border-bottom 150ms ease-in;
	order: 2;
}
.new.list {
	font-size: 1.1rem;
}
.new.task {
	margin-bottom: 0;
}
.new.task,
.new.list {
	padding: 0.25em;
}
.new-task-creator .create {
	color: var(--clr-primary);
}
.new:focus {
	border-bottom-width: 3px;
}
.new:focus::placeholder {
	opacity: 0.2;
}
.active-list {
	font-weight: 700;
}
.todo-list {
	--spacer: 2rem;

	grid-area: active;
	background-color: var(--clr-light);
	color: var(--clr-dark);
}
.todo-header {
	padding: var(--spacer);
	background-color: #e4e4e4;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.list-title {
	margin: 0 1em 0 0;
}
.task-count {
	margin: 0;
	font-size: 1rem;
}
.todo-body {
	padding: var(--spacer);
}
.task label {
	display: inline-flex;
	align-items: center;
	position: relative;
}
.task {
	position: relative;
	margin-bottom: 1.25em;
}
.task::after {
	content: "";
	position: absolute;
	right: 0;
	left: 0;
	bottom: -0.5em;
	height: 1px;
	background: currentColor;
	opacity: 0.1;
}

[type="checkbox"] {
	opacity: 0;
	position: absolute;
}
.custom-checkbox {
	--size: 0.75em;
	display: inline-block;
	width: var(--size);
	height: var(--size);
	cursor: pointer;
	border: 2px solid currentColor;
	border-radius: 50%;
	margin-right: var(--size);
	transform: scale(1);
	transition: transform 200ms ease-in-out;
}
.task:hover .custom-checkbox,
[type="checkbox"]:focus + label .custom-checkbox {
	transform: scale(1.1);
	color: var(--clr-primary);
}
[type="checkbox"]:checked + label .custom-checkbox {
	background: var(--clr-primary);
	border-color: var(--clr-primary);
	box-shadow: inset 0 0 0px 2px white;
}
[type="checkbox"]:checked + label {
	opacity: 0.5;
}
.task label::after {
	content: "";
	position: absolute;
	left: 1.5em;
	right: 0;
	top: calc(50% - 1.5px);
	height: 3px;
	background: currentColor;
	transform: scaleX(0);
	transition: transform 150ms ease-in-out;
	transform-origin: right;
}
[type="checkbox"]:checked + label::after {
	transform: scaleX(1);
	transform-origin: left;
}
.todo-body {
	position: relative;
}
.delete-stuff {
	display: flex;
	justify-content: space-evenly;
	position: absolute;
	width: 100%;
	left: 0;
	bottom: -35px;
	color: var(--clr-light);
}
.btn.delete {
	opacity: 0.7;
	font-size: 1.1rem;
	transition: color 200ms;
}
.btn.delete:hover {
	color: var(--clr-warning);
}
