import React, { useState, useRef, useEffect } from 'react';

import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'

import { Task } from './TasksList';

interface TasksProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string ) => void;
}


export function TaskItem({ task, toggleTaskDone, removeTask, editTask }: TasksProps){
  const [ editing, setEditing ] = useState(false);
  const [ titleEdit, setTitleEdit ] = useState(task.title)
  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing(){
    setEditing(true)
  }

  function handleCancelEditing(){
    setTitleEdit(task.title)
    setEditing(false)
  }

  function handleSubmitEditing(){
    editTask(task.id, titleEdit)
    setEditing(false)
  }

  useEffect(()=> {
    if (textInputRef.current){
      if (editing){
        textInputRef.current.focus()
      }else{
        textInputRef.current.blur()
      }

    }
  }, [editing]) 

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View 
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput 
            value= {titleEdit}
            onChangeText={setTitleEdit}
            editable={editing}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
          />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        {
          editing ?
          <TouchableOpacity
            onPress={handleCancelEditing}
          >
            <Icon 
                name="x"
                size={25}
                color="#FFF"
              />
          </TouchableOpacity> 
        :
          <TouchableOpacity
            onPress={handleStartEditing}
          >
              <Image source={editIcon} />
          </TouchableOpacity>
        }

        <View style={styles.iconDivider} />

        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={() => removeTask(task.id)}
          disabled={editing}
        >
          <Image source={trashIcon} style={{opacity: editing ? .2 : 1 }} />
        </TouchableOpacity>
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconDivider: {
    height: 24,
    width: 1,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    marginHorizontal: 10,
  }
})