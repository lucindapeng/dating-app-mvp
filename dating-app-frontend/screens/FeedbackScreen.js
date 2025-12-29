import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { submitFeedback } from '../api/feedback';

export default function FeedbackScreen({ route, navigation }) {
  const { dateId } = route.params;

  const [rating, setRating] = useState('');
  const [comments, setComments] = useState('');
  const [secondDate, setSecondDate] = useState(null);

  const handleSubmit = async () => {
    try {
      await submitFeedback({
        date_id: dateId,
        rating: Number(rating),
        comments,
        wants_second_date: secondDate,
      });

      alert('Feedback submitted');
      navigation.popToTop();
    } catch (err) {
      alert('Error submitting feedback');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How was your date?</Text>

      <TextInput
        placeholder="Rating (1–5)"
        keyboardType="numeric"
        value={rating}
        onChangeText={setRating}
        style={styles.input}
      />

      <TextInput
        placeholder="Comments"
        value={comments}
        onChangeText={setComments}
        style={[styles.input, { height: 80 }]}
        multiline
      />

      <Text style={styles.label}>Would you go on a second date?</Text>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => setSecondDate(true)}>
          <Text style={secondDate === true ? styles.selected : styles.option}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSecondDate(false)}>
          <Text style={secondDate === false ? styles.selected : styles.option}>No</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 16 },
  input: { borderWidth: 1, padding: 10, marginBottom: 12 },
  label: { marginTop: 10 },
  row: { flexDirection: 'row', gap: 20, marginVertical: 10 },
  option: { fontSize: 18 },
  selected: { fontSize: 18, fontWeight: '700', color: 'green' },
  button: { backgroundColor: '#007AFF', padding: 14, marginTop: 20 },
  buttonText: { color: 'white', textAlign: 'center' },
});
