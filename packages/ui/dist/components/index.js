import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export var Button = function (_a) {
    var children = _a.children, _b = _a.variant, variant = _b === void 0 ? 'primary' : _b, _c = _a.size, size = _c === void 0 ? 'md' : _c, onClick = _a.onClick, _d = _a.disabled, disabled = _d === void 0 ? false : _d, _e = _a.className, className = _e === void 0 ? '' : _e;
    var baseClasses = 'font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
    var variantClasses = {
        primary: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
        secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
        outline: 'border border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500'
    };
    var sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base'
    };
    var disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
    return (_jsx("button", { className: "".concat(baseClasses, " ").concat(variantClasses[variant], " ").concat(sizeClasses[size], " ").concat(disabledClasses, " ").concat(className), onClick: onClick, disabled: disabled, children: children }));
};
export var Card = function (_a) {
    var children = _a.children, _b = _a.className, className = _b === void 0 ? '' : _b;
    return (_jsx("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 ".concat(className), children: children }));
};
export var Input = function (_a) {
    var label = _a.label, placeholder = _a.placeholder, value = _a.value, onChange = _a.onChange, _b = _a.type, type = _b === void 0 ? 'text' : _b, _c = _a.disabled, disabled = _c === void 0 ? false : _c, _d = _a.className, className = _d === void 0 ? '' : _d;
    return (_jsxs("div", { className: "space-y-1", children: [label && (_jsx("label", { className: "block text-sm font-medium text-gray-700", children: label })), _jsx("input", { type: type, placeholder: placeholder, value: value, onChange: function (e) { return onChange === null || onChange === void 0 ? void 0 : onChange(e.target.value); }, disabled: disabled, className: "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-500 ".concat(className) })] }));
};
