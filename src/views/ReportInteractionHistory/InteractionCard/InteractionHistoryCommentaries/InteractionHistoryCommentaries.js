import React, { useState, useEffect } from 'react';
import api from 'utils/API';
import Commentary from './Commentary'

const InteractionHistoryCommentaries = props => {
    const { commentaries, currentUserId } = props;

    // const [commentaries, setCommentaries] = useState([])

    useEffect(() => {
        // api.get(`/report-interaction-history/${interaction.id}/commentary`)
        //     .then((result) => {
        //         setCommentaries(result.data)
        //     })
    }, [])

    return (
        <div>
            {commentaries.map(commentary => (
                <Commentary key={commentary.id} currentUserId={currentUserId} commentary={commentary}></Commentary>                    
            ))}
        </div>
    ) 
}

export default InteractionHistoryCommentaries;