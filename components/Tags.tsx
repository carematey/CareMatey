import {
    Wrap,
    WrapItem,
    Tag,
    TagCloseButton,
    TagLabel,
    InputGroup,
    Input,
    InputRightElement,
    Button,
    VStack,
} from '@chakra-ui/react';
import React from 'react';
import { tagColors } from '../utils/tagColors';
export default function Tags({
    tagSize,
    tags,
    editMode,
    handleAddTag,
    handleDeleteTag,
}: {
    tagSize: string;
    tags: string[] | undefined;
    handleAddTag?: (tag: string) => void;
    handleDeleteTag?: (idx: number) => void;
    editMode?: boolean;
}) {
    const [newTag, setNewTag] = React.useState('');
    return editMode ? (
        <VStack width={'100%'}>
            <InputGroup bg={'#ffffff90'} width={'100%'}>
                <Input
                    value={newTag.toLowerCase()}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleAddTag && handleAddTag(newTag);
                            setNewTag('');
                        }
                    }}
                    onChange={(e) => setNewTag(e.target.value.toLowerCase())}
                    placeholder="Tags"
                />
                <InputRightElement>
                    <Button
                        colorScheme={'blue'}
                        onClick={() => handleAddTag && handleAddTag(newTag)}
                    >
                        Add
                    </Button>
                </InputRightElement>
            </InputGroup>
            <Wrap spacing={2} m={0} p={0} pt={4} alignSelf={'flex-start'}>
                {tags?.map((tag: string, index: number) => (
                    <WrapItem key={index}>
                        <Tag
                            p={1}
                            textOverflow={'ellipsis'}
                            whiteSpace={'nowrap'}
                            overflow={'hidden'}
                            size={tagSize}
                            colorScheme={
                                tagColors[
                                    tag.toString().length % tagColors.length
                                ]
                            }
                        >
                            <TagLabel> {tag.toString().toLowerCase()}</TagLabel>
                            <TagCloseButton
                                onClick={() =>
                                    handleDeleteTag && handleDeleteTag(index)
                                }
                            />
                        </Tag>
                    </WrapItem>
                ))}
            </Wrap>
        </VStack>
    ) : (
        <Wrap spacing={2} m={0} p={0} pt={4} alignSelf={'flex-start'}>
            {tags?.map((tag: string, index: number) => (
                <WrapItem key={index}>
                    <Tag
                        p={1}
                        textOverflow={'ellipsis'}
                        whiteSpace={'nowrap'}
                        overflow={'hidden'}
                        size={tagSize}
                        colorScheme={
                            tagColors[tag.toString().length % tagColors.length]
                        }
                    >
                        {tag.toString().toLowerCase()}
                    </Tag>
                </WrapItem>
            ))}
        </Wrap>
    );
}
