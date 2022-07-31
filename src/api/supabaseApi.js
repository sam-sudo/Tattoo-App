import { createClient } from '@supabase/supabase-js'
import 'react-native-url-polyfill/auto'

const supabaseUrl = 'https://nczpmcgimhxmgsyhbgfv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jenBtY2dpbWh4bWdzeWhiZ2Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgyMjU4MTIsImV4cCI6MTk3MzgwMTgxMn0.DdYHG9dc8_D5rzP-Deg2K2gVB1sXmYRYWm-EAPORI7Q'
export const supabase = createClient(supabaseUrl, supabaseKey)



//-----------Item Task METHODS------------------

export async function updateItemTask(itemUpdated){
    console.log('updating...');
    const {data, error} = await supabase
    .from('tasks')
    .update({...itemUpdated})
    .match({id: itemUpdated.id})
}