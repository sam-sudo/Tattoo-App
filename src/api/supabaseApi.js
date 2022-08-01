import { createClient } from '@supabase/supabase-js'
import 'react-native-url-polyfill/auto'

const supabaseUrl = 'https://nczpmcgimhxmgsyhbgfv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jenBtY2dpbWh4bWdzeWhiZ2Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgyMjU4MTIsImV4cCI6MTk3MzgwMTgxMn0.DdYHG9dc8_D5rzP-Deg2K2gVB1sXmYRYWm-EAPORI7Q'
export const supabase = createClient(supabaseUrl, supabaseKey)



//-----------Item Task METHODS------------------

const databaseName_tasks = 'tasks'


export async function getSupabaseTasks() {
    let { data: tasksSupabase, error } = await supabase
        .from(databaseName_tasks)
        .select()
    const textError = {
        sdf: 'ERROR - Please check your connection'
    }


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
    const {data,error} = await supabase
    .from(databaseName_tasks)
    .delete()
    .match({id:idDelete})
}
