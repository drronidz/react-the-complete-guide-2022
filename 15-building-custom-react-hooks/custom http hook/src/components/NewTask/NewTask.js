import {useState} from 'react';

import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from "../../hooks/use-http";

const NewTask = (props) => {

    const {isLoading, error, sendRequest: postTask} = useHttp()

    const enterTaskHandler = async (taskText) => {
        const createTask = (taskDATA) => {
            const generatedId = taskDATA.name; // firebase-specific => "name" contains generated id
            const createdTask = {id: generatedId, text: taskText};

            props.onAddTask(createdTask);
        }

        postTask({
            url: 'https://taks-46710-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: {text: taskText}
        }, createTask)
    };

    return (
        <Section>
            <TaskForm onEnterTask={enterTaskHandler} loading={isLoading}/>
            {error && <p>{error}</p>}
        </Section>
    );
};

export default NewTask;
