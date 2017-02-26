'use babel';

import AtomWordCountView from './atom-word-count-view';
import { CompositeDisposable } from 'atom';

export default {

  atomWordCountView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomWordCountView = new AtomWordCountView(state.atomWordCountViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomWordCountView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-word-count:fetch': () => this.fetch()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomWordCountView.destroy();
  },

  serialize() {
    return {
      atomWordCountViewState: this.atomWordCountView.serialize()
    };
  },
  fetch() {
    console.log('AtomWordCount was toggle!');
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText();
      this.download(selection);
    }
  },
  download(url) {
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        console.log(body)
      }
    })
  }

};
