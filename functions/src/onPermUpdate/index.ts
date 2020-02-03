import * as functions from 'firebase-functions';
import updatePermWithChanges from './updatePermWithChanges'

export default function onPermUpdate(change: functions.Change<FirebaseFirestore.DocumentSnapshot>): Promise<void>
{
	const before = change.before.data();
	const after = change.after.data();
	return updatePermWithChanges(before, after);
}
