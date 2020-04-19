
import {Window, windowManager} from 'node-window-manager';
import EventEmitter from 'events';

export class ProcessListen {
	eventEmitter: EventEmitter.EventEmitter;
	processArr: string[];
	activeWindow?: Window;
	openedProcesses: Window[];
	constructor(processArr: string[]) {
		this.eventEmitter = new EventEmitter.EventEmitter();
		this.processArr = processArr;
		this.activeWindow = undefined;
		this.openedProcesses = [];
		setTimeout(() => {
			this.loop(true);
		});
	}

	changed(cb: (name?: Window) => void) {
		this.eventEmitter.on("changed", window => {
			if (!window) return cb(undefined);
			cb(window)
		})
	}

	async loop(started?: boolean) {
		const processes = windowManager.getWindows();

		const newOpenedProcesses = this.processArr.map(pa => {
			return processes.find(p => {
				return p.path.indexOf(pa, p.path.length - pa.length) != -1;
			})
		}).filter(pa => pa)

		const closedProgramsArr = this.openedProcesses.filter(x => {
			return !newOpenedProcesses.find(a => a?.path === x.path)
		});

		if (started) {
			if (newOpenedProcesses.length) {
				this.eventEmitter.emit('changed', newOpenedProcesses[0]);
				this.activeWindow = newOpenedProcesses[0];
			}
		}

		closedProgramsArr.forEach(cp => {
			if (cp.path === this.activeWindow?.path) {
				if (newOpenedProcesses.length) {
					this.eventEmitter.emit('changed', newOpenedProcesses[0]);
					this.activeWindow = newOpenedProcesses[0];
				} else {
					this.eventEmitter.emit('changed', undefined);
					this.activeWindow = undefined
				}
			}
		})


		this.openedProcesses = newOpenedProcesses as Window[];

		const activeWindow = windowManager.getActiveWindow();

		if ((!this.activeWindow || this.activeWindow.processId !== activeWindow.processId) && this.processArr.find(pa => activeWindow.path.indexOf(pa, activeWindow.path.length - pa.length) != -1)) {
			this.eventEmitter.emit('changed', activeWindow);
			this.activeWindow = activeWindow;
		}


		setTimeout(() => this.loop(), 5000);
	}
}

export function getWindows () {
	const filteredFolder = ["Windows"];

	const arr: Window[] = [];

	const windowArr = windowManager.getWindows();
	for (let index = 0; index < windowArr.length; index++) {
		const window = windowArr[index];
		if (arr.findIndex(w => w.path === window.path) + 1) continue;
		const path = window.path.substring(3);
		if (filteredFolder.find(f => path.startsWith(f))) continue;
		if (window.getTitle() === "") continue;
		if (!window.isWindow()) continue;
		arr.push(window);
	}	
	return arr;

}

// export function getWindows () {
// 	const filteredFolder = ["Windows"];
// 	const windowsArr = windowManager.getWindows().filter((window, index, self) => {
// 		const path = window.path.split('\\');
// 		if (window.getTitle() === "") return false;
// 		if (path[1] && filteredFolder.includes(path[1])) return false;
// 		return index === self.findIndex(w => (w.path === window.path))
// 	})
// 	return windowsArr
// }
