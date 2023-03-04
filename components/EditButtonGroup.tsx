import { IconButton } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';
export function EditButtonGroup({
    editMode,
    editNameId,
    setEditNameId,
    setDeleteSpaceId,
    onOpen,
    setEditSpaceNameValue,
    handleEditSpaceName,
}: any) {
    const MotionIcon = motion(IconButton);

    return (
        <>
            {editMode ? (
                editNameId !== space.id ? (
                    <>
                        <MotionIcon
                            whileHover={{
                                scale: 1.02,
                            }}
                            whileTap={{
                                scale: 0.99,
                            }}
                            size={'md'}
                            aria-label="edit"
                            colorScheme={
                                editNameId === space.id ? 'blue' : 'gray'
                            }
                            icon={<EditIcon />}
                            onClick={() => {
                                setEditNameId(space.id);
                            }}
                        />
                        <MotionIcon
                            whileHover={{
                                scale: 1.02,
                            }}
                            whileTap={{
                                scale: 0.99,
                            }}
                            size={'md'}
                            aria-label="delete"
                            icon={<DeleteIcon />}
                            onClick={() => {
                                setDeleteSpaceId(space.id);
                                onOpen();
                            }}
                        />
                    </>
                ) : (
                    <>
                        <MotionIcon
                            whileHover={{
                                scale: 1.02,
                            }}
                            whileTap={{
                                scale: 0.99,
                            }}
                            size={'md'}
                            aria-label="cancel"
                            colorScheme={'red'}
                            opacity={0.9}
                            icon={<CloseIcon />}
                            onClick={() => {
                                setEditNameId(null);
                                setEditSpaceNameValue('');
                            }}
                        />
                        <MotionIcon
                            whileHover={{
                                scale: 1.02,
                            }}
                            whileTap={{
                                scale: 0.99,
                            }}
                            size={'md'}
                            aria-label="save"
                            colorScheme={'teal'}
                            opacity={0.9}
                            icon={<CheckIcon />}
                            onClick={() => {
                                handleEditSpaceName(space.id);
                                setEditNameId(null);
                                setEditSpaceNameValue('');
                            }}
                        />
                    </>
                )
            ) : null}
        </>
    );
}
