import Modal from 'react-native-modal';
import React, {useState, useMemo, FC, useEffect} from 'react';
import {
  View,
  Text,
  Platform,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import {COLORS} from 'constants/colors';
import {STRINGS} from 'constants/strings';
import {Task} from '../types';

type Props = {
  visible: boolean;
  onClose: () => void;
  onAdd: (title: string, description: string) => void;
  onUpdate?: (id: number, title: string, description: string) => void;
  taskToEdit?: Task | null;
};

const CreateTaskModal: FC<Props> = ({
  visible,
  onClose,
  onAdd,
  onUpdate,
  taskToEdit,
}) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDesc(taskToEdit.description);
    } else {
      setTitle('');
      setDesc('');
    }
  }, [taskToEdit]);

  const isSubmitDisabled = useMemo(
    () => !title?.trim() || !desc?.trim(),
    [title, desc],
  );

  const handleSubmit = () => {
    if (isSubmitDisabled) return;

    if (taskToEdit && onUpdate)
      onUpdate(taskToEdit.id, title?.trim(), desc?.trim());
    else onAdd(title?.trim(), desc?.trim());

    onClose();
    setTitle('');
    setDesc('');
  };

  return (
    <Modal isVisible={visible} backdropOpacity={0.6} style={styles.modal}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeText}>{STRINGS.CLOSE}</Text>
          </TouchableOpacity>

          <Text style={styles.header}>
            {taskToEdit ? STRINGS.EDIT_TASK : STRINGS.CREATE_TASK}
          </Text>

          <TextInput
            value={title}
            placeholder={STRINGS.TASK_TITLE}
            onChangeText={setTitle}
            placeholderTextColor={COLORS.PLACEHOLDER}
            style={styles.input}
            returnKeyType="next"
          />
          <TextInput
            value={desc}
            placeholder={STRINGS.TASK_DESC}
            onChangeText={setDesc}
            placeholderTextColor={COLORS.PLACEHOLDER}
            multiline
            textAlignVertical="top"
            style={[styles.input, styles.textArea]}
          />

          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelText}>{STRINGS.CANCEL}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isSubmitDisabled}
              style={[styles.addBtn, isSubmitDisabled && styles.disabledBtn]}>
              <Text style={styles.addText}>
                {taskToEdit ? STRINGS.UPDATE : STRINGS.ADD}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CreateTaskModal;

const styles = StyleSheet.create({
  modal: {margin: 0},
  overlay: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    gap: 16,
    padding: 20,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: COLORS.BORDER,
    backgroundColor: COLORS.WHITE,
  },
  closeBtn: {
    padding: 6,
    borderWidth: 1,
    borderRadius: 6,
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    borderColor: COLORS.PRIMARY,
  },
  closeText: {
    fontWeight: '600',
    color: COLORS.PRIMARY,
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.PRIMARY,
  },
  input: {
    padding: 10,
    fontSize: 14,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.BORDER,
  },
  textArea: {
    height: 100,
  },
  actions: {
    gap: 12,
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelText: {
    fontSize: 16,
    color: COLORS.DESCRIPTION,
  },
  addBtn: {
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.PRIMARY,
  },
  addText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT,
  },
  disabledBtn: {
    opacity: 0.5,
  },
});
