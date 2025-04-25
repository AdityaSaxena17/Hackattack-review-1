import React, { useEffect } from 'react';
import FileExplorer from './Components/FileExplorer';
import './App.css';
import { WebContainer } from '@webcontainer/api';
import { useAtom } from 'jotai';
import { activeTabAtom, fileTreeAtom, stepsAtom, urlAtom, webContainerAtom } from './store';

// Define the Todo interface
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Define the file structure interface to match FileTree component
interface FileContent {
  contents: string;
}

interface FileNode {
  file?: FileContent;
  directory?: Record<string, FileNode>;
}

function App() {
 
 // Here's the converted structure in the WebContainer format:

const files = {
  "src": {
    "directory": {
      "components": {
        "directory": {
          "TodoList.jsx": {
            "file": {
              "contents": "import React from 'react';\nimport TodoItem from './TodoItem';\n\nconst TodoList = ({ todos, toggleComplete, deleteTodo }) => {\n  return (\n    <div className=\"todo-list\">\n      {todos.length === 0 ? (\n        <p className=\"empty-message\">No tasks yet! Add one above.</p>\n      ) : (\n        todos.map((todo) => (\n          <TodoItem\n            key={todo.id}\n            todo={todo}\n            toggleComplete={toggleComplete}\n            deleteTodo={deleteTodo}\n          />\n        ))\n      )}\n    </div>\n  );\n};\n\nexport default TodoList;"
            }
          },
          "TodoItem.jsx": {
            "file": {
              "contents": "import React from 'react';\n\nconst TodoItem = ({ todo, toggleComplete, deleteTodo }) => {\n  return (\n    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>\n      <input\n        type=\"checkbox\"\n        checked={todo.completed}\n        onChange={() => toggleComplete(todo.id)}\n      />\n      <p className=\"todo-text\">{todo.text}</p>\n      <button\n        className=\"delete-btn\"\n        onClick={() => deleteTodo(todo.id)}\n      >\n        Delete\n      </button>\n    </div>\n  );\n};\n\nexport default TodoItem;"
            }
          },
          "TodoForm.jsx": {
            "file": {
              "contents": "import React, { useState } from 'react';\n\nconst TodoForm = ({ addTodo }) => {\n  const [text, setText] = useState('');\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    if (!text.trim()) return;\n    addTodo(text);\n    setText('');\n  };\n\n  return (\n    <form className=\"todo-form\" onSubmit={handleSubmit}>\n      <input\n        type=\"text\"\n        value={text}\n        onChange={(e) => setText(e.target.value)}\n        placeholder=\"Add a new task...\"\n      />\n      <button type=\"submit\">Add</button>\n    </form>\n  );\n};\n\nexport default TodoForm;"
            }
          }
        }
      },
      "App.jsx": {
        "file": {
          "contents": "import React, { useState, useEffect } from 'react';\nimport TodoForm from './components/TodoForm';\nimport TodoList from './components/TodoList';\nimport './App.css';\n\nfunction App() {\n  const [todos, setTodos] = useState(() => {\n    const savedTodos = localStorage.getItem('todos');\n    if (savedTodos) {\n      return JSON.parse(savedTodos);\n    } else {\n      return [];\n    }\n  });\n\n  useEffect(() => {\n    localStorage.setItem('todos', JSON.stringify(todos));\n  }, [todos]);\n\n  const addTodo = (text) => {\n    const newTodo = {\n      id: Date.now(),\n      text,\n      completed: false\n    };\n    setTodos([...todos, newTodo]);\n  };\n\n  const toggleComplete = (id) => {\n    setTodos(\n      todos.map((todo) =>\n        todo.id === id ? { ...todo, completed: !todo.completed } : todo\n      )\n    );\n  };\n\n  const deleteTodo = (id) => {\n    setTodos(todos.filter((todo) => todo.id !== id));\n  };\n\n  return (\n    <div className=\"app\">\n      <h1>Todo App</h1>\n      <div className=\"todo-container\">\n        <TodoForm addTodo={addTodo} />\n        <TodoList\n          todos={todos}\n          toggleComplete={toggleComplete}\n          deleteTodo={deleteTodo}\n        />\n      </div>\n    </div>\n  );\n}\n\nexport default App;"
        }
      },
      "App.css": {
        "file": {
          "contents": "* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n  background-color: #f5f5f5;\n  color: #333;\n}\n\n.app {\n  max-width: 600px;\n  margin: 0 auto;\n  padding: 2rem;\n}\n\nh1 {\n  text-align: center;\n  margin-bottom: 2rem;\n  color: #2c3e50;\n}\n\n.todo-container {\n  background-color: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n}\n\n.todo-form {\n  display: flex;\n  padding: 1rem;\n  border-bottom: 1px solid #eee;\n}\n\n.todo-form input {\n  flex: 1;\n  padding: 0.8rem;\n  border: 1px solid #ddd;\n  border-radius: 4px 0 0 4px;\n  font-size: 1rem;\n}\n\n.todo-form button {\n  padding: 0.8rem 1.5rem;\n  background-color: #3498db;\n  color: white;\n  border: none;\n  border-radius: 0 4px 4px 0;\n  cursor: pointer;\n  font-size: 1rem;\n}\n\n.todo-form button:hover {\n  background-color: #2980b9;\n}\n\n.todo-list {\n  padding: 1rem;\n}\n\n.todo-item {\n  display: flex;\n  align-items: center;\n  padding: 1rem;\n  border-bottom: 1px solid #eee;\n}\n\n.todo-item:last-child {\n  border-bottom: none;\n}\n\n.todo-item.completed .todo-text {\n  text-decoration: line-through;\n  color: #888;\n}\n\n.todo-item input[type=\"checkbox\"] {\n  margin-right: 1rem;\n  transform: scale(1.2);\n}\n\n.todo-text {\n  flex: 1;\n}\n\n.delete-btn {\n  padding: 0.5rem;\n  background-color: #e74c3c;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n}\n\n.delete-btn:hover {\n  background-color: #c0392b;\n}\n\n.empty-message {\n  text-align: center;\n  padding: 1rem;\n  color: #7f8c8d;\n}"
        }
      },
      "main.jsx": {
        "file": {
          "contents": "import React from 'react'\nimport ReactDOM from 'react-dom/client'\nimport App from './App.jsx'\nimport './index.css'\n\nReactDOM.createRoot(document.getElementById('root')).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>,\n)"
        }
      },
      "index.css": {
        "file": {
          "contents": ":root {\n  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;\n  line-height: 1.5;\n  font-weight: 400;\n}\n\nbody {\n  margin: 0;\n  display: flex;\n  min-width: 320px;\n  min-height: 100vh;\n}"
        }
      }
    }
  },
  "index.html": {
    "file": {
      "contents": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <link rel=\"icon\" type=\"image/svg+xml\" href=\"/vite.svg\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Todo App</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>"
    }
  },
  "package.json": {
    "file": {
      "contents": "{\n  \"name\": \"todo-app\",\n  \"private\": true,\n  \"version\": \"0.0.0\",\n  \"type\": \"module\",\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"vite build\",\n    \"lint\": \"eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0\",\n    \"preview\": \"vite preview\"\n  },\n  \"dependencies\": {\n    \"react\": \"^18.2.0\",\n    \"react-dom\": \"^18.2.0\"\n  },\n  \"devDependencies\": {\n    \"@types/react\": \"^18.2.15\",\n    \"@types/react-dom\": \"^18.2.7\",\n    \"@vitejs/plugin-react\": \"^4.0.3\",\n    \"eslint\": \"^8.45.0\",\n    \"eslint-plugin-react\": \"^7.32.2\",\n    \"eslint-plugin-react-hooks\": \"^4.6.0\",\n    \"eslint-plugin-react-refresh\": \"^0.4.3\",\n    \"vite\": \"^4.4.5\"\n  }\n}"
    }
  },
  "vite.config.js": {
    "file": {
      "contents": "import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\n\n// https://vitejs.dev/config/\nexport default defineConfig({\n  plugins: [react()],\n})"
    }
  },
  "README.md": {
    "file": {
      "contents": "# React + Vite Todo App\n\nA simple todo application built with React and Vite.\n\n## Features\n\n- Add new tasks\n- Mark tasks as complete\n- Delete tasks\n- Local storage persistence\n\n## Getting Started\n\n### Prerequisites\n\n- Node.js (v14+)\n- npm or yarn\n\n### Installation\n\n1. Clone the repository\n2. Install dependencies: `npm install` or `yarn`\n3. Start the development server: `npm run dev` or `yarn dev`\n4. Open your browser at `http://localhost:5173`\n\n## Project Structure\n\n- `src/components/` - React components\n  - `TodoForm.jsx` - Component for adding new todos\n  - `TodoList.jsx` - Component for displaying all todos\n  - `TodoItem.jsx` - Component for individual todo items\n- `src/App.jsx` - Main application component\n- `src/App.css` - Styling for the application\n\n## Built With\n\n- React - JavaScript library for building user interfaces\n- Vite - Frontend build tool\n\n## License\n\nThis project is licensed under the MIT License."
    }
  }
};
  
  
  
  
  
    // Here's the converted structure in the WebContainer format:
    const [webContainerInstance, setWebContainerInstance] = useAtom(webContainerAtom);
    const [url, setUrl] = useAtom(urlAtom);
    const [Steps, setSteps] = useAtom(stepsAtom);
    const [filetree, setFiletree] = useAtom(fileTreeAtom);
    const [activeTab, setActiveTab] = useAtom(activeTabAtom);
  
  
      function fileInit(){
  
      }
  
      function stepsInit(){
        // Only initialize steps if they're not already set
        if (Steps.length === 0) {
          const dummySteps = [
            "Create a new Vite app with React: npm create vite@latest my-todo-app -- --template react",
            "Navigate to project directory: cd my-todo-app",
            "Create components folder in src directory",
            "Create TodoForm.jsx component",
            "Create TodoItem.jsx component",
            "Create TodoList.jsx component",
            "Set up App.jsx with state management",
            "Create main.jsx to render the app",
            "Style your application with CSS",
            "Install dependencies: npm install",
            "Start the development server: npm run dev"
          ];
          setSteps(dummySteps);
        }
      }
    
    async function init() {
      // Only initialize if the webContainer doesn't exist yet
      if (webContainerInstance !== null) {
        return;
      }

      try {
        stepsInit();
        fileInit();
        console.log("Booting WebContainer...");
        const instance = await WebContainer.boot();
        console.log("WebContainer booted!", instance);
        setWebContainerInstance(instance);
    
        await instance.mount(files);
        console.log("Files mounted.");
    
        console.log("Installing dependencies...");
        const installProcess = await instance.spawn('npm', ['install']);
    
        installProcess.output.pipeTo(new WritableStream({
          write(data) {
            console.log(data);
          }
        }));
    
        // Wait for the installation process to complete
        const installExitCode = await installProcess.exit;
        if (installExitCode !== 0) {
          throw new Error(`npm install failed with exit code ${installExitCode}`);
        }
    
        console.log("Starting development server...");
        const devProcess = await instance.spawn('npm', ['run', 'dev']);
    
        devProcess.output.pipeTo(new WritableStream({
          write(data) {
            console.log(data);
          }
        }));
    
        instance.on('server-ready', (port, url) => {
          console.log(`Server is ready at ${url}`);
          setUrl(url);
        });
    
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
    
      useEffect(()=>{
        init();
      },[webContainerInstance]) // Add webContainerInstance as a dependency
    return (
      <div className='w-full h-screen flex justify-around bg-gray-950'>
        <button className='absolute top-0 right-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium p-5 h-10 w-20'>Deploy</button>
        <div className='h-full w-1/4 border border-gray-700 rounded-lg text-amber-300 bg-gray-900 overflow-y-auto shadow-lg mb-10'>
          <p className='text-center py-3 font-bold text-xl border-b border-gray-700'>Steps </p>
          <div className='p-4 flex flex-col gap-10 mt-10'>
            {
              Steps.map((step, index) => (
                <div key={index} className={`mb-20 flex items-start ${index === 0 ? 'mt-10' : ''}`}>
                  <span className='flex items-center justify-center bg-green-500 text-white rounded-full w-6 h-6 mr-3 flex-shrink-0'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className='text-white'>{step}</p>
                </div>
              ))
            }

            <div className={`flex items-center justify-center absolute bottom-0 left-0 ${activeTab === 'explorer' ? 'w-[550px]' : 'w-[290px]'} mx-auto`}>
              <input type="text" placeholder='Enter your prompt' className='w-full p-2 h-10 rounded-md bg-gray-800 text-white border border-gray-700' />
              <button className='bg-green-500 text-white px-4 py-2 rounded-md ml-2 p-5 h-10 w-20'>
             
              Send
              </button>
            </div>
          </div>
        </div>
        <div className='flex flex-col w-full h-full mx-5'>
          <div className='flex mb-2 h-12'>
            <button 
              className={`px-4 py-2 rounded-t-lg font-medium ${activeTab === 'explorer' ? 'bg-gray-900 text-amber-300' : 'bg-gray-800 text-gray-400'}`}
              onClick={() => setActiveTab('explorer')}
            >
              File Explorer
            </button>
            <button 
              className={`px-4 py-2 rounded-t-lg font-medium ${activeTab === 'preview' ? 'bg-gray-900 text-amber-300' : 'bg-gray-800 text-gray-400'}`}
              onClick={() => setActiveTab('preview')}
            >
              Preview
            </button>
          </div>
          {activeTab === 'explorer' ? (
            <div className='w-full h-full border text-amber-300 bg-gray-900'>
              <FileExplorer structure={files} />
            </div>
          ) : (
            url ? 
            <iframe className='w-full h-full border' src={url}/> : 
            <p className='flex items-center justify-center text-white w-full h-full border bg-gray-900'>Loading preview...</p>
          )}
        </div>
      </div>
    ) 
  }
  export default App;