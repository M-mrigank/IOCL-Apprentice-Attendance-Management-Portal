const apprenticeRecordReducer=(state=[], action)=>{
    switch (action?.type){
        case 'FETCH_APPRENTICE':
            return action?.payload;
        case 'UPDATE_CURRENT_APPRENTICE':
            return state.map((state)=>state._id===action?.payload._id?action.payload:state);
        default:
            return state;
    }
}

export default apprenticeRecordReducer;