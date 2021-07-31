import React from "react";
import EventIcon from "@material-ui/icons/Event";
import { Draggable,DraggableProvided } from "react-beautiful-dnd";
import {
    CardContainer,
    CardLabel,
    CardTitle,
    CardFooter,
    DueDate,
    StyledAvatar,
} from "./CardStyle";
const Card: React.FC<{ card: any; index: number }> = ({ card, index }) => {
    return (
        <Draggable draggableId={`${card.id}`} index={index}>
            {(provided:DraggableProvided) => (
                <CardContainer
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <CardLabel></CardLabel>

                    <CardTitle>{card.title}</CardTitle>
                    <CardFooter>
                        {card.due_date ? (
                            <DueDate>
                                <EventIcon /> card.due_date
                            </DueDate>
                        ) : (
                            ""
                        )}
                        <StyledAvatar
                            alt="Cindy Baker"
                            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                            className="small"
                        />
                    </CardFooter>
                </CardContainer>
            )}
        </Draggable>
    );
};

export default Card;
