import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (tasks.find(task => task.title === newTaskTitle)) {
      Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com o mesmo nome")
    }
    else{
      const task = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }
      setTasks(oldState => [...oldState, task]);
    }

  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const filteredTask = updatedTasks.find(task => task.id === id )

    if(!filteredTask){
      return
    }
    else{
      filteredTask.done = !filteredTask.done
      setTasks(updatedTasks)
    }
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Remover item", "Tem certeza que você deseja remover esse item?", [
      {
        text: "Não"
      },
      {
        text: "Sim",
        onPress: () => setTasks(oldState => oldState.filter(task => task.id !== id))
      }
    ])
  }

  function handleEditTask(taskId: number, taskNewTitle: string){
    const updatedEdit = tasks.map(task => ({ ...task }));
    const filteredEdit = updatedEdit.find(data => data.id === taskId);
    if(!filteredEdit){
      return
    }else{
      filteredEdit.title = taskNewTitle
      setTasks(updatedEdit)
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})