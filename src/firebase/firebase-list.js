import { firebaseDb } from './firebase';

export class FirebaseList {
  constructor(actions, modelClass, path = null) {
    this._actions = actions;
    this._modelClass = modelClass;
    this._path = path;
  }

  get path() {
    return this._path;
  }

  set path(value) {
    //console.log("PATH::",value)
    this._path = value;
  }

  push(value) {
    console.log("VALUE::", value)
    return new Promise((resolve, reject) => {
      firebaseDb.ref(this._path)
        .push(value, error => error ? reject(error) : resolve());
    });
  }

  remove(key) {
    console.log("REMOVE1::", `${this._path}`);
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this._path}/${key}`)
        .remove(error => error ? reject(error) : resolve());
    });
  }

  removeNoKey() {
    // console.log("REMOVE1::", `${this._path}`);
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this._path}`)
        .remove(error => error ? reject(error) : resolve());
    });
  }

  set(key, value) {
    // console.log("PATH::", this._path);
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this._path}/${key}`)
        .set(value, error => error ? reject(error) : resolve());
    });
  }

  setNoKey(value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this._path}`)
        .set(value, error => error ? reject(error) : resolve());
    });
  }

  update(key, value) {
    // console.log("KEY::",key)
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this._path}/${key}`)
        .update(value, error => error ? reject(error) : resolve());
    });
  }

  updateNoKey(value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this._path}`)
        .update(value, error => error ? reject(error) : resolve());
    });
  }

  subscribe(emit) {
    let ref = firebaseDb.ref(this._path);
    let initialized = false;
    let list = [];

    ref.once('value', () => {
      initialized = true;
      emit(this._actions.onLoad(list));
    });

    ref.on('child_added', snapshot => {
      if (initialized) {
        emit(this._actions.onAdd(this.unwrapSnapshot(snapshot)));
      }
      else {
        // debugger;
        list.push(this.unwrapSnapshot(snapshot));
      }
    });

    ref.on('child_changed', snapshot => {
      console.log('SNAP::',snapshot);
      emit(this._actions.onChange(this.unwrapSnapshot(snapshot)));
    });

    ref.on('child_removed', snapshot => {
      emit(this._actions.onRemove(this.unwrapSnapshot(snapshot)));
    });

    this._unsubscribe = () => ref.off();
  }

  subscribeOnce(emit) {
    let ref = firebaseDb.ref(this._path);
    console.log("REF::",ref)
    // eslint-disable-next-line
    let initialized = false;
    // eslint-disable-next-line
    let list = [];
    console.log("ACTIONS::",this._actions)
   
    ref.once('value', snapshot => {
      initialized = true
      console.log("SNAPSHOT::", snapshot);
      // emit(this._actions.onLoad(list));
      emit(this._actions.onLoad(this.unwrapSnapshot(snapshot)));
    });

    // ref.on('child_added', snapshot => {
    //   if (initialized) {
    //     emit(this._actions.onAdd(this.unwrapSnapshot(snapshot)));
    //   }
    //   else {
    //     // debugger;
    //     list.push(this.unwrapSnapshot(snapshot));
    //   }
    // });

    ref.on('child_changed', snapshot => {
      console.log('SNAP::',snapshot);
      emit(this._actions.onChange(this.unwrapSnapshot(snapshot)));
    });

    // ref.on('child_removed', snapshot => {
    //   emit(this._actions.onRemove(this.unwrapSnapshot(snapshot)));
    // });

    this._unsubscribe = () => ref.off();
  }

  subscribeOnceKv(emit) {
    let ref = firebaseDb.ref(this._path);
    ref.once('value', snapshot => {
      emit(this._actions.onLoad(this.unwrapSnapshot(snapshot)));
    });
  }


  unsubscribe() {
    this._unsubscribe();
  }

  unwrapSnapshot(snapshot) {
    if (snapshot.exists()) {
      console.log("SP::",snapshot);
      let attrs = snapshot.val();
      attrs.key = snapshot.key;
      return new this._modelClass(attrs);
    }
  }

  unwrapSnapshotkv(snapshot) {
    let attrs = { key: snapshot.key, value: snapshot.val() };
    return new this._modelClass(attrs);
  }
}
