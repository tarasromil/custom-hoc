/**
 * Returns stack handler for global events
 * @param options {Object} Options for EventListeners
 * @returns {{push: function(Object), pop: function()}} Functions for push or pop events into stack
 */
export const eventStackFactory = (options) => {
  let stack = [];


  /**
   * Adds or removes EventListeners into window Element
   * @param action {Function} "addEventListener" OR "removeEventListener" callback
   * @param events {Object} List of events and handlers. E.g. {{ click: function (event) {} }}
   */
  const handleEvents = (action, events) =>
    Object.entries(events).forEach(([type, handler]) => action(type, handler, options));


  /**
   * @returns {Object} Last element of stack
   */
  const getLast = () => stack[stack.length - 1];


  /**
   * Pushes new events to stack and handles global EventListeners
   * @param nextEvents {Object} List of Events {{ type: handler }}
   */
  const push = (nextEvents) => {
    if (stack.length > 0) {
      const prevEvents = getLast();
      handleEvents(window.removeEventListener, prevEvents);
    }

    stack = stack.concat(nextEvents);

    handleEvents(window.addEventListener, nextEvents);
  };


  /**
   * Pops last events from stack and handles global EventListeners
   */
  const pop = () => {
    const prevEvents = getLast();
    handleEvents(window.removeEventListener, prevEvents);

    stack = stack.slice(0, -1);

    if (stack.length > 0) {
      const nextEvents = getLast();
      handleEvents(window.addEventListener, nextEvents);
    }
  };


  return { push, pop };
};

