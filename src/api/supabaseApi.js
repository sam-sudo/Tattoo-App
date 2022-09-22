import { createClient } from '@supabase/supabase-js'
import 'react-native-url-polyfill/auto'

const supabaseUrl = 'https://nczpmcgimhxmgsyhbgfv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jenBtY2dpbWh4bWdzeWhiZ2Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgyMjU4MTIsImV4cCI6MTk3MzgwMTgxMn0.DdYHG9dc8_D5rzP-Deg2K2gVB1sXmYRYWm-EAPORI7Q'
const options = {
    schema: 'public',
    headers: { 'x-my-custom-header': 'my-app-name' },
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  }


export const supabase = createClient(supabaseUrl, supabaseKey,options)



//-----------Item Task METHODS------------------

const databaseName_tasks = 'tasks'




export async function getSupabaseTasks() {
    let { data: tasksSupabase, error } = await supabase
        .from(databaseName_tasks)
        .select()




    if (error) {
        setErrorMessage(error.message)
        setShowSnackbar(true)
    }
    return error ? [] : tasksSupabase

}

export async function updateItemTask(updatedItem) {
    console.log('updating...');
    const { data, error } = await supabase
        .from(databaseName_tasks)
        .update({ ...updatedItem })
        .match({ id: updatedItem.id })
}

export async function addNewItemTask(newItem) {
    console.log('adding...');
    const { data, error } = await supabase
        .from(databaseName_tasks)
        .insert(newItem)
}


export async function deleteTask(idDelete) {
    const { data, error } = await supabase
        .from(databaseName_tasks)
        .delete()
        .match({ id: idDelete })
}


export function getBucketUrlPath(bucket, user,task) {

    const { data, error } = supabase.storage.from(bucket).getPublicUrl(user+'/'+task)

    return data
}

export async function getBucketNames(bucket, user, task) {

    const { data, error } = await supabase.storage.from(bucket).list(user+'/'+task)


    return data
}
