import React from "react";
import EventIcon from "@material-ui/icons/Event";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import {
    CardContainer,
    CardLabel,
    CardTitle,
    CardFooter,
    DueDate,
    StyledAvatar,
} from "./CardStyle";
import { Tooltip } from "@material-ui/core";
import * as nameUtlis from "../../utils/name";

const Card: React.FC<{ card: any; index: number }> = ({ card, index }) => {
    return (
        <Draggable draggableId={`${card.id}`} index={index}>
            {(provided: DraggableProvided) => (
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
                        {card.assigned_to ? (
                            <Tooltip title={card.assigned_to.name}>
                                {card.assigned_to.avatar ? (
                                    <StyledAvatar
                                        alt={card.assigned_to.name}
                                        src={card.assigned_to.avatar}
                                        className="small"
                                    />
                                ) : (
                                    <StyledAvatar>
                                        {nameUtlis.getInitials(
                                            card.assigned_to.name
                                        )}
                                    </StyledAvatar>
                                )}
                            </Tooltip>
                        ) : (
                            ""
                        )}
                    </CardFooter>
                </CardContainer>
            )}
        </Draggable>
    );
};

export default Card;
