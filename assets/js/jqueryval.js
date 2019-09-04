! function(n) {
    "function" == typeof define && define.amd ? define(["jquery"], n) : n(jQuery)
}(function(n) {
    n.extend(n.fn, {
        validate: function(t) {
            if (!this.length) return void(t && t.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
            var i = n.data(this[0], "validator");
            return i ? i : (this.attr("novalidate", "novalidate"), i = new n.validator(t, this[0]), n.data(this[0], "validator", i), i.settings.onsubmit && (this.validateDelegate(":submit", "click", function(t) {
                i.settings.submitHandler && (i.submitButton = t.target);
                n(t.target).hasClass("cancel") && (i.cancelSubmit = !0);
                void 0 !== n(t.target).attr("formnovalidate") && (i.cancelSubmit = !0)
            }), this.submit(function(t) {
                function r() {
                    var r;
                    return i.settings.submitHandler ? (i.submitButton && (r = n("<input type='hidden'/>").attr("name", i.submitButton.name).val(n(i.submitButton).val()).appendTo(i.currentForm)), i.settings.submitHandler.call(i, i.currentForm, t), i.submitButton && r.remove(), !1) : !0
                }
                return i.settings.debug && t.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, r()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0, !1) : r() : (i.focusInvalid(), !1)
            })), i)
        },
        valid: function() {
            var t, i;
            return n(this[0]).is("form") ? t = this.validate().form() : (t = !0, i = n(this[0].form).validate(), this.each(function() {
                t = i.element(this) && t
            })), t
        },
        removeAttrs: function(t) {
            var i = {},
                r = this;
            return n.each(t.split(/\s/), function(n, t) {
                i[t] = r.attr(t);
                r.removeAttr(t)
            }), i
        },
        rules: function(t, i) {
            var e, s, f, u, o, h, r = this[0];
            if (t) switch (e = n.data(r.form, "validator").settings, s = e.rules, f = n.validator.staticRules(r), t) {
                case "add":
                    n.extend(f, n.validator.normalizeRule(i));
                    delete f.messages;
                    s[r.name] = f;
                    i.messages && (e.messages[r.name] = n.extend(e.messages[r.name], i.messages));
                    break;
                case "remove":
                    return i ? (h = {}, n.each(i.split(/\s/), function(t, i) {
                        h[i] = f[i];
                        delete f[i];
                        "required" === i && n(r).removeAttr("aria-required")
                    }), h) : (delete s[r.name], f)
            }
            return u = n.validator.normalizeRules(n.extend({}, n.validator.classRules(r), n.validator.attributeRules(r), n.validator.dataRules(r), n.validator.staticRules(r)), r), u.required && (o = u.required, delete u.required, u = n.extend({
                required: o
            }, u), n(r).attr("aria-required", "true")), u.remote && (o = u.remote, delete u.remote, u = n.extend(u, {
                remote: o
            })), u
        }
    });
    n.extend(n.expr[":"], {
        blank: function(t) {
            return !n.trim("" + n(t).val())
        },
        filled: function(t) {
            return !!n.trim("" + n(t).val())
        },
        unchecked: function(t) {
            return !n(t).prop("checked")
        }
    });
    n.validator = function(t, i) {
        this.settings = n.extend(!0, {}, n.validator.defaults, t);
        this.currentForm = i;
        this.init()
    };
    n.validator.format = function(t, i) {
        return 1 === arguments.length ? function() {
            var i = n.makeArray(arguments);
            return i.unshift(t), n.validator.format.apply(this, i)
        } : (arguments.length > 2 && i.constructor !== Array && (i = n.makeArray(arguments).slice(1)), i.constructor !== Array && (i = [i]), n.each(i, function(n, i) {
            t = t.replace(new RegExp("\\{" + n + "\\}", "g"), function() {
                return i
            })
        }), t)
    };
    n.extend(n.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusInvalid: !0,
            errorContainer: n([]),
            errorLabelContainer: n([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(n) {
                this.lastActive = n;
                this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, n, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(n)))
            },
            onfocusout: function(n) {
                !this.checkable(n) && (n.name in this.submitted || !this.optional(n)) && this.element(n)
            },
            onkeyup: function(n, t) {
                (9 !== t.which || "" !== this.elementValue(n)) && (n.name in this.submitted || n === this.lastElement) && this.element(n)
            },
            onclick: function(n) {
                n.name in this.submitted ? this.element(n) : n.parentNode.name in this.submitted && this.element(n.parentNode)
            },
            highlight: function(t, i, r) {
                "radio" === t.type ? this.findByName(t.name).addClass(i).removeClass(r) : n(t).addClass(i).removeClass(r)
            },
            unhighlight: function(t, i, r) {
                "radio" === t.type ? this.findByName(t.name).removeClass(i).addClass(r) : n(t).removeClass(i).addClass(r)
            }
        },
        setDefaults: function(t) {
            n.extend(n.validator.defaults, t)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date ( ISO ).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: n.validator.format("Please enter no more than {0} characters."),
            minlength: n.validator.format("Please enter at least {0} characters."),
            rangelength: n.validator.format("Please enter a value between {0} and {1} characters long."),
            range: n.validator.format("Please enter a value between {0} and {1}."),
            max: n.validator.format("Please enter a value less than or equal to {0}."),
            min: n.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function i(t) {
                    var r = n.data(this[0].form, "validator"),
                        u = "on" + t.type.replace(/^validate/, ""),
                        i = r.settings;
                    i[u] && !this.is(i.ignore) && i[u].call(r, this[0], t)
                }
                this.labelContainer = n(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || n(this.currentForm);
                this.containers = n(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();
                var t, r = this.groups = {};
                n.each(this.settings.groups, function(t, i) {
                    "string" == typeof i && (i = i.split(/\s/));
                    n.each(i, function(n, i) {
                        r[i] = t
                    })
                });
                t = this.settings.rules;
                n.each(t, function(i, r) {
                    t[i] = n.validator.normalizeRule(r)
                });
                n(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']", "focusin focusout keyup", i).validateDelegate("select, option, [type='radio'], [type='checkbox']", "click", i);
                this.settings.invalidHandler && n(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
                n(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
            },
            form: function() {
                return this.checkForm(), n.extend(this.submitted, this.errorMap), this.invalid = n.extend({}, this.errorMap), this.valid() || n(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var n = 0, t = this.currentElements = this.elements(); t[n]; n++) this.check(t[n]);
                return this.valid()
            },
            element: function(t) {
                var u = this.clean(t),
                    i = this.validationTargetFor(u),
                    r = !0;
                return this.lastElement = i, void 0 === i ? delete this.invalid[u.name] : (this.prepareElement(i), this.currentElements = n(i), r = this.check(i) !== !1, r ? delete this.invalid[i.name] : this.invalid[i.name] = !0), n(t).attr("aria-invalid", !r), this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), r
            },
            showErrors: function(t) {
                if (t) {
                    n.extend(this.errorMap, t);
                    this.errorList = [];
                    for (var i in t) this.errorList.push({
                        message: t[i],
                        element: this.findByName(i)[0]
                    });
                    this.successList = n.grep(this.successList, function(n) {
                        return !(n.name in t)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                n.fn.resetForm && n(this.currentForm).resetForm();
                this.submitted = {};
                this.lastElement = null;
                this.prepareForm();
                this.hideErrors();
                this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(n) {
                var i, t = 0;
                for (i in n) t++;
                return t
            },
            hideErrors: function() {
                this.hideThese(this.toHide)
            },
            hideThese: function(n) {
                n.not(this.containers).text("");
                this.addWrapper(n).hide()
            },
            valid: function() {
                return 0 === this.size()
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) try {
                    n(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (t) {}
            },
            findLastActive: function() {
                var t = this.lastActive;
                return t && 1 === n.grep(this.errorList, function(n) {
                    return n.element.name === t.name
                }).length && t
            },
            elements: function() {
                var t = this,
                    i = {};
                return n(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
                    return !this.name && t.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in i || !t.objectLength(n(this).rules()) ? !1 : (i[this.name] = !0, !0)
                })
            },
            clean: function(t) {
                return n(t)[0]
            },
            errors: function() {
                var t = this.settings.errorClass.split(" ").join(".");
                return n(this.settings.errorElement + "." + t, this.errorContext)
            },
            reset: function() {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = n([]);
                this.toHide = n([]);
                this.currentElements = n([])
            },
            prepareForm: function() {
                this.reset();
                this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(n) {
                this.reset();
                this.toHide = this.errorsFor(n)
            },
            elementValue: function(t) {
                var i, u = n(t),
                    r = t.type;
                return "radio" === r || "checkbox" === r ? n("input[name='" + t.name + "']:checked").val() : "number" === r && "undefined" != typeof t.validity ? t.validity.badInput ? !1 : u.val() : (i = u.val(), "string" == typeof i ? i.replace(/\r/g, "") : i)
            },
            check: function(t) {
                t = this.validationTargetFor(this.clean(t));
                var i, r, u, f = n(t).rules(),
                    s = n.map(f, function(n, t) {
                        return t
                    }).length,
                    e = !1,
                    h = this.elementValue(t);
                for (r in f) {
                    u = {
                        method: r,
                        parameters: f[r]
                    };
                    try {
                        if (i = n.validator.methods[r].call(this, h, t, u.parameters), "dependency-mismatch" === i && 1 === s) {
                            e = !0;
                            continue
                        }
                        if (e = !1, "pending" === i) return void(this.toHide = this.toHide.not(this.errorsFor(t)));
                        if (!i) return this.formatAndAdd(t, u), !1
                    } catch (o) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + t.id + ", check the '" + u.method + "' method.", o), o;
                    }
                }
                if (!e) return this.objectLength(f) && this.successList.push(t), !0
            },
            customDataMessage: function(t, i) {
                return n(t).data("msg" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()) || n(t).data("msg")
            },
            customMessage: function(n, t) {
                var i = this.settings.messages[n];
                return i && (i.constructor === String ? i : i[t])
            },
            findDefined: function() {
                for (var n = 0; n < arguments.length; n++)
                    if (void 0 !== arguments[n]) return arguments[n];
                return void 0
            },
            defaultMessage: function(t, i) {
                return this.findDefined(this.customMessage(t.name, i), this.customDataMessage(t, i), !this.settings.ignoreTitle && t.title || void 0, n.validator.messages[i], "<strong>Warning: No message defined for " + t.name + "<\/strong>")
            },
            formatAndAdd: function(t, i) {
                var r = this.defaultMessage(t, i.method),
                    u = /\$?\{(\d+)\}/g;
                "function" == typeof r ? r = r.call(this, i.parameters, t) : u.test(r) && (r = n.validator.format(r.replace(u, "{$1}"), i.parameters));
                this.errorList.push({
                    message: r,
                    element: t,
                    method: i.method
                });
                this.errorMap[t.name] = r;
                this.submitted[t.name] = r
            },
            addWrapper: function(n) {
                return this.settings.wrapper && (n = n.add(n.parent(this.settings.wrapper))), n
            },
            defaultShowErrors: function() {
                for (var i, t, n = 0; this.errorList[n]; n++) t = this.errorList[n], this.settings.highlight && this.settings.highlight.call(this, t.element, this.settings.errorClass, this.settings.validClass), this.showLabel(t.element, t.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (n = 0; this.successList[n]; n++) this.showLabel(this.successList[n]);
                if (this.settings.unhighlight)
                    for (n = 0, i = this.validElements(); i[n]; n++) this.settings.unhighlight.call(this, i[n], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow);
                this.hideErrors();
                this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return n(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(t, i) {
                var u, o, e, r = this.errorsFor(t),
                    s = this.idOrName(t),
                    f = n(t).attr("aria-describedby");
                r.length ? (r.removeClass(this.settings.validClass).addClass(this.settings.errorClass), r.html(i)) : (r = n("<" + this.settings.errorElement + ">").attr("id", s + "-error").addClass(this.settings.errorClass).html(i || ""), u = r, this.settings.wrapper && (u = r.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(u) : this.settings.errorPlacement ? this.settings.errorPlacement(u, n(t)) : u.insertAfter(t), r.is("label") ? r.attr("for", s) : 0 === r.parents("label[for='" + s + "']").length && (e = r.attr("id"), f ? f.match(new RegExp("\b" + e + "\b")) || (f += " " + e) : f = e, n(t).attr("aria-describedby", f), o = this.groups[t.name], o && n.each(this.groups, function(t, i) {
                    i === o && n("[name='" + t + "']", this.currentForm).attr("aria-describedby", r.attr("id"))
                })));
                !i && this.settings.success && (r.text(""), "string" == typeof this.settings.success ? r.addClass(this.settings.success) : this.settings.success(r, t));
                this.toShow = this.toShow.add(r)
            },
            errorsFor: function(t) {
                var r = this.idOrName(t),
                    u = n(t).attr("aria-describedby"),
                    i = "label[for='" + r + "'], label[for='" + r + "'] *";
                return u && (i = i + ", #" + u.replace(/\s+/g, ", #")), this.errors().filter(i)
            },
            idOrName: function(n) {
                return this.groups[n.name] || (this.checkable(n) ? n.name : n.id || n.name)
            },
            validationTargetFor: function(n) {
                return this.checkable(n) && (n = this.findByName(n.name).not(this.settings.ignore)[0]), n
            },
            checkable: function(n) {
                return /radio|checkbox/i.test(n.type)
            },
            findByName: function(t) {
                return n(this.currentForm).find("[name='" + t + "']")
            },
            getLength: function(t, i) {
                switch (i.nodeName.toLowerCase()) {
                    case "select":
                        return n("option:selected", i).length;
                    case "input":
                        if (this.checkable(i)) return this.findByName(i.name).filter(":checked").length
                }
                return t.length
            },
            depend: function(n, t) {
                return this.dependTypes[typeof n] ? this.dependTypes[typeof n](n, t) : !0
            },
            dependTypes: {
                boolean: function(n) {
                    return n
                },
                string: function(t, i) {
                    return !!n(t, i.form).length
                },
                "function": function(n, t) {
                    return n(t)
                }
            },
            optional: function(t) {
                var i = this.elementValue(t);
                return !n.validator.methods.required.call(this, i, t) && "dependency-mismatch"
            },
            startRequest: function(n) {
                this.pending[n.name] || (this.pendingRequest++, this.pending[n.name] = !0)
            },
            stopRequest: function(t, i) {
                this.pendingRequest--;
                this.pendingRequest < 0 && (this.pendingRequest = 0);
                delete this.pending[t.name];
                i && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (n(this.currentForm).submit(), this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (n(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            },
            previousValue: function(t) {
                return n.data(t, "previousValue") || n.data(t, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(t, "remote")
                })
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(t, i) {
            t.constructor === String ? this.classRuleSettings[t] = i : n.extend(this.classRuleSettings, t)
        },
        classRules: function(t) {
            var i = {},
                r = n(t).attr("class");
            return r && n.each(r.split(" "), function() {
                this in n.validator.classRuleSettings && n.extend(i, n.validator.classRuleSettings[this])
            }), i
        },
        attributeRules: function(t) {
            var r, i, u = {},
                e = n(t),
                f = t.getAttribute("type");
            for (r in n.validator.methods) "required" === r ? (i = t.getAttribute(r), "" === i && (i = !0), i = !!i) : i = e.attr(r), /min|max/.test(r) && (null === f || /number|range|text/.test(f)) && (i = Number(i)), i || 0 === i ? u[r] = i : f === r && "range" !== f && (u[r] = !0);
            return u.maxlength && /-1|2147483647|524288/.test(u.maxlength) && delete u.maxlength, u
        },
        dataRules: function(t) {
            var i, r, u = {},
                f = n(t);
            for (i in n.validator.methods) r = f.data("rule" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()), void 0 !== r && (u[i] = r);
            return u
        },
        staticRules: function(t) {
            var i = {},
                r = n.data(t.form, "validator");
            return r.settings.rules && (i = n.validator.normalizeRule(r.settings.rules[t.name]) || {}), i
        },
        normalizeRules: function(t, i) {
            return n.each(t, function(r, u) {
                if (u === !1) return void delete t[r];
                if (u.param || u.depends) {
                    var f = !0;
                    switch (typeof u.depends) {
                        case "string":
                            f = !!n(u.depends, i.form).length;
                            break;
                        case "function":
                            f = u.depends.call(i, i)
                    }
                    f ? t[r] = void 0 !== u.param ? u.param : !0 : delete t[r]
                }
            }), n.each(t, function(r, u) {
                t[r] = n.isFunction(u) ? u(i) : u
            }), n.each(["minlength", "maxlength"], function() {
                t[this] && (t[this] = Number(t[this]))
            }), n.each(["rangelength", "range"], function() {
                var i;
                t[this] && (n.isArray(t[this]) ? t[this] = [Number(t[this][0]), Number(t[this][1])] : "string" == typeof t[this] && (i = t[this].replace(/[\[\]]/g, "").split(/[\s,]+/), t[this] = [Number(i[0]), Number(i[1])]))
            }), n.validator.autoCreateRanges && (t.min && t.max && (t.range = [t.min, t.max], delete t.min, delete t.max), t.minlength && t.maxlength && (t.rangelength = [t.minlength, t.maxlength], delete t.minlength, delete t.maxlength)), t
        },
        normalizeRule: function(t) {
            if ("string" == typeof t) {
                var i = {};
                n.each(t.split(/\s/), function() {
                    i[this] = !0
                });
                t = i
            }
            return t
        },
        addMethod: function(t, i, r) {
            n.validator.methods[t] = i;
            n.validator.messages[t] = void 0 !== r ? r : n.validator.messages[t];
            i.length < 3 && n.validator.addClassRules(t, n.validator.normalizeRule(t))
        },
        methods: {
            required: function(t, i, r) {
                if (!this.depend(r, i)) return "dependency-mismatch";
                if ("select" === i.nodeName.toLowerCase()) {
                    var u = n(i).val();
                    return u && u.length > 0
                }
                return this.checkable(i) ? this.getLength(t, i) > 0 : n.trim(t).length > 0
            },
            email: function(n, t) {
                return this.optional(t) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(n)
            },
            url: function(n, t) {
                return this.optional(t) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(n)
            },
            date: function(n, t) {
                return this.optional(t) || !/Invalid|NaN/.test(new Date(n).toString())
            },
            dateISO: function(n, t) {
                return this.optional(t) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(n)
            },
            number: function(n, t) {
                return this.optional(t) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(n)
            },
            digits: function(n, t) {
                return this.optional(t) || /^\d+$/.test(n)
            },
            creditcard: function(n, t) {
                if (this.optional(t)) return "dependency-mismatch";
                if (/[^0-9 \-]+/.test(n)) return !1;
                var i, f, e = 0,
                    r = 0,
                    u = !1;
                if (n = n.replace(/\D/g, ""), n.length < 13 || n.length > 19) return !1;
                for (i = n.length - 1; i >= 0; i--) f = n.charAt(i), r = parseInt(f, 10), u && (r *= 2) > 9 && (r -= 9), e += r, u = !u;
                return e % 10 == 0
            },
            minlength: function(t, i, r) {
                var u = n.isArray(t) ? t.length : this.getLength(n.trim(t), i);
                return this.optional(i) || u >= r
            },
            maxlength: function(t, i, r) {
                var u = n.isArray(t) ? t.length : this.getLength(n.trim(t), i);
                return this.optional(i) || r >= u
            },
            rangelength: function(t, i, r) {
                var u = n.isArray(t) ? t.length : this.getLength(n.trim(t), i);
                return this.optional(i) || u >= r[0] && u <= r[1]
            },
            min: function(n, t, i) {
                return this.optional(t) || n >= i
            },
            max: function(n, t, i) {
                return this.optional(t) || i >= n
            },
            range: function(n, t, i) {
                return this.optional(t) || n >= i[0] && n <= i[1]
            },
            equalTo: function(t, i, r) {
                var u = n(r);
                return this.settings.onfocusout && u.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                    n(i).valid()
                }), t === u.val()
            },
            remote: function(t, i, r) {
                if (this.optional(i)) return "dependency-mismatch";
                var u, e, f = this.previousValue(i);
                return this.settings.messages[i.name] || (this.settings.messages[i.name] = {}), f.originalMessage = this.settings.messages[i.name].remote, this.settings.messages[i.name].remote = f.message, r = "string" == typeof r && {
                    url: r
                } || r, f.old === t ? f.valid : (f.old = t, u = this, this.startRequest(i), e = {}, e[i.name] = t, n.ajax(n.extend(!0, {
                    url: r,
                    mode: "abort",
                    port: "validate" + i.name,
                    dataType: "json",
                    data: e,
                    context: u.currentForm,
                    success: function(r) {
                        var o, e, h, s = r === !0 || "true" === r;
                        u.settings.messages[i.name].remote = f.originalMessage;
                        s ? (h = u.formSubmitted, u.prepareElement(i), u.formSubmitted = h, u.successList.push(i), delete u.invalid[i.name], u.showErrors()) : (o = {}, e = r || u.defaultMessage(i, "remote"), o[i.name] = f.message = n.isFunction(e) ? e(t) : e, u.invalid[i.name] = !0, u.showErrors(o));
                        f.valid = s;
                        u.stopRequest(i, s)
                    }
                }, r)), "pending")
            }
        }
    });
    n.format = function() {
        throw "$.format has been deprecated. Please use $.validator.format instead.";
    };
    var i, t = {};
    n.ajaxPrefilter ? n.ajaxPrefilter(function(n, i, r) {
        var u = n.port;
        "abort" === n.mode && (t[u] && t[u].abort(), t[u] = r)
    }) : (i = n.ajax, n.ajax = function(r) {
        var f = ("mode" in r ? r : n.ajaxSettings).mode,
            u = ("port" in r ? r : n.ajaxSettings).port;
        return "abort" === f ? (t[u] && t[u].abort(), t[u] = i.apply(this, arguments), t[u]) : i.apply(this, arguments)
    });
    n.extend(n.fn, {
        validateDelegate: function(t, i, r) {
            return this.bind(i, function(i) {
                var u = n(i.target);
                if (u.is(t)) return r.apply(u, arguments)
            })
        }
    })
}),
function(n) {
    function i(n, t, i) {
        n.rules[t] = i;
        n.message && (n.messages[t] = n.message)
    }

    function h(n) {
        return n.replace(/^\s+|\s+$/g, "").split(/\s*,\s*/g)
    }

    function f(n) {
        return n.replace(/([!"#$%&'()*+,./:;<=>?@\[\\\]^`{|}~])/g, "\\$1")
    }

    function e(n) {
        return n.substr(0, n.lastIndexOf(".") + 1)
    }

    function o(n, t) {
        return n.indexOf("*.") === 0 && (n = n.replace("*.", t)), n
    }

    function c(t, i) {
        var r = n(this).find("[data-valmsg-for='" + f(i[0].name) + "']"),
            u = r.attr("data-valmsg-replace"),
            e = u ? n.parseJSON(u) !== !1 : null;
        r.removeClass("field-validation-valid").addClass("field-validation-error");
        t.data("unobtrusiveContainer", r);
        e ? (r.empty(), t.removeClass("input-validation-error").appendTo(r)) : t.hide()
    }

    function l(t, i) {
        var u = n(this).find("[data-valmsg-summary=true]"),
            r = u.find("ul");
        r && r.length && i.errorList.length && (r.empty(), u.addClass("validation-summary-errors").removeClass("validation-summary-valid"), n.each(i.errorList, function() {
            n("<li />").html(this.message).appendTo(r)
        }))
    }

    function a(t) {
        var i = t.data("unobtrusiveContainer"),
            r = i.attr("data-valmsg-replace"),
            u = r ? n.parseJSON(r) : null;
        i && (i.addClass("field-validation-valid").removeClass("field-validation-error"), t.removeData("unobtrusiveContainer"), u && i.empty())
    }

    function v() {
        var t = n(this),
            i = "__jquery_unobtrusive_validation_form_reset";
        if (!t.data(i)) {
            t.data(i, !0);
            try {
                t.data("validator").resetForm()
            } finally {
                t.removeData(i)
            }
            t.find(".validation-summary-errors").addClass("validation-summary-valid").removeClass("validation-summary-errors");
            t.find(".field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error").removeData("unobtrusiveContainer").find(">*").removeData("unobtrusiveContainer")
        }
    }

    function s(t) {
        var i = n(t),
            f = i.data(u),
            s = n.proxy(v, t),
            e = r.unobtrusive.options || {},
            o = function(i, r) {
                var u = e[i];
                u && n.isFunction(u) && u.apply(t, r)
            };
        return f || (f = {
            options: {
                errorClass: e.errorClass || "input-validation-error",
                errorElement: e.errorElement || "span",
                errorPlacement: function() {
                    c.apply(t, arguments);
                    o("errorPlacement", arguments)
                },
                invalidHandler: function() {
                    l.apply(t, arguments);
                    o("invalidHandler", arguments)
                },
                messages: {},
                rules: {},
                success: function() {
                    a.apply(t, arguments);
                    o("success", arguments)
                }
            },
            attachValidation: function() {
                i.off("reset." + u, s).on("reset." + u, s).validate(this.options)
            },
            validate: function() {
                return i.validate(), i.valid()
            }
        }, i.data(u, f)), f
    }
    var r = n.validator,
        t, u = "unobtrusiveValidation";
    r.unobtrusive = {
        adapters: [],
        parseElement: function(t, i) {
            var u = n(t),
                f = u.parents("form")[0],
                r, e, o;
            f && (r = s(f), r.options.rules[t.name] = e = {}, r.options.messages[t.name] = o = {}, n.each(this.adapters, function() {
                var i = "data-val-" + this.name,
                    r = u.attr(i),
                    s = {};
                r !== undefined && (i += "-", n.each(this.params, function() {
                    s[this] = u.attr(i + this)
                }), this.adapt({
                    element: t,
                    form: f,
                    message: r,
                    params: s,
                    rules: e,
                    messages: o
                }))
            }), n.extend(e, {
                __dummy__: !0
            }), i || r.attachValidation())
        },
        parse: function(t) {
            var i = n(t),
                u = i.parents().addBack().filter("form").add(i.find("form")).has("[data-val=true]");
            i.find("[data-val=true]").each(function() {
                r.unobtrusive.parseElement(this, !0)
            });
            u.each(function() {
                var n = s(this);
                n && n.attachValidation()
            })
        }
    };
    t = r.unobtrusive.adapters;
    t.add = function(n, t, i) {
        return i || (i = t, t = []), this.push({
            name: n,
            params: t,
            adapt: i
        }), this
    };
    t.addBool = function(n, t) {
        return this.add(n, function(r) {
            i(r, t || n, !0)
        })
    };
    t.addMinMax = function(n, t, r, u, f, e) {
        return this.add(n, [f || "min", e || "max"], function(n) {
            var f = n.params.min,
                e = n.params.max;
            f && e ? i(n, u, [f, e]) : f ? i(n, t, f) : e && i(n, r, e)
        })
    };
    t.addSingleVal = function(n, t, r) {
        return this.add(n, [t || "val"], function(u) {
            i(u, r || n, u.params[t])
        })
    };
    r.addMethod("__dummy__", function() {
        return !0
    });
    r.addMethod("regex", function(n, t, i) {
        var r;
        return this.optional(t) ? !0 : (r = new RegExp(i).exec(n), r && r.index === 0 && r[0].length === n.length)
    });
    r.addMethod("nonalphamin", function(n, t, i) {
        var r;
        return i && (r = n.match(/\W/g), r = r && r.length >= i), r
    });
    r.methods.extension ? (t.addSingleVal("accept", "mimtype"), t.addSingleVal("extension", "extension")) : t.addSingleVal("extension", "extension", "accept");
    t.addSingleVal("regex", "pattern");
    t.addBool("creditcard").addBool("date").addBool("digits").addBool("email").addBool("number").addBool("url");
    t.addMinMax("length", "minlength", "maxlength", "rangelength").addMinMax("range", "min", "max", "range");
    t.addMinMax("minlength", "minlength").addMinMax("maxlength", "minlength", "maxlength");
    t.add("equalto", ["other"], function(t) {
        var r = e(t.element.name),
            u = t.params.other,
            s = o(u, r),
            h = n(t.form).find(":input").filter("[name='" + f(s) + "']")[0];
        i(t, "equalTo", h)
    });
    t.add("required", function(n) {
        (n.element.tagName.toUpperCase() !== "INPUT" || n.element.type.toUpperCase() !== "CHECKBOX") && i(n, "required", !0)
    });
    t.add("remote", ["url", "type", "additionalfields"], function(t) {
        var r = {
                url: t.params.url,
                type: t.params.type || "GET",
                data: {}
            },
            u = e(t.element.name);
        n.each(h(t.params.additionalfields || t.element.name), function(i, e) {
            var s = o(e, u);
            r.data[s] = function() {
                var i = n(t.form).find(":input").filter("[name='" + f(s) + "']");
                return i.is(":checkbox") ? i.filter(":checked").val() || i.filter(":hidden").val() || "" : i.is(":radio") ? i.filter(":checked").val() || "" : i.val()
            }
        });
        i(t, "remote", r)
    });
    t.add("password", ["min", "nonalphamin", "regex"], function(n) {
        n.params.min && i(n, "minlength", n.params.min);
        n.params.nonalphamin && i(n, "nonalphamin", n.params.nonalphamin);
        n.params.regex && i(n, "regex", n.params.regex)
    });
    n(function() {
        r.unobtrusive.parse(document)
    })
}(jQuery);
! function(n) {
    "function" == typeof define && define.amd ? define(["jquery", "./jquery.validate.min"], n) : n(jQuery)
}(function(n) {
    ! function() {
        function t(n) {
            return n.replace(/<.[^<>]*?>/g, " ").replace(/&nbsp;|&#160;/gi, " ").replace(/[.(),;:!?%#$'\"_+=\/\-“”’]*/g, "")
        }
        n.validator.addMethod("maxWords", function(n, i, r) {
            return this.optional(i) || t(n).match(/\b\w+\b/g).length <= r
        }, n.validator.format("Please enter {0} words or less."));
        n.validator.addMethod("minWords", function(n, i, r) {
            return this.optional(i) || t(n).match(/\b\w+\b/g).length >= r
        }, n.validator.format("Please enter at least {0} words."));
        n.validator.addMethod("rangeWords", function(n, i, r) {
            var u = t(n),
                f = /\b\w+\b/g;
            return this.optional(i) || u.match(f).length >= r[0] && u.match(f).length <= r[1]
        }, n.validator.format("Please enter between {0} and {1} words."))
    }();
    n.validator.addMethod("accept", function(t, i, r) {
        var u, e, f = "string" == typeof r ? r.replace(/\s/g, "").replace(/,/g, "|") : "image/*",
            o = this.optional(i);
        if (o) return o;
        if ("file" === n(i).attr("type") && (f = f.replace(/\*/g, ".*"), i.files && i.files.length))
            for (u = 0; u < i.files.length; u++)
                if (e = i.files[u], !e.type.match(new RegExp(".?(" + f + ")$", "i"))) return !1;
        return !0
    }, n.validator.format("Please enter a value with a valid mimetype."));
    n.validator.addMethod("alphanumeric", function(n, t) {
        return this.optional(t) || /^\w+$/i.test(n)
    }, "Letters, numbers, and underscores only please");
    n.validator.addMethod("bankaccountNL", function(n, t) {
        if (this.optional(t)) return !0;
        if (!/^[0-9]{9}|([0-9]{2} ){3}[0-9]{3}$/.test(n)) return !1;
        for (var r, u, f = n.replace(/ /g, ""), e = 0, o = f.length, i = 0; o > i; i++) r = o - i, u = f.substring(i, i + 1), e += r * u;
        return e % 11 == 0
    }, "Please specify a valid bank account number");
    n.validator.addMethod("bankorgiroaccountNL", function(t, i) {
        return this.optional(i) || n.validator.methods.bankaccountNL.call(this, t, i) || n.validator.methods.giroaccountNL.call(this, t, i)
    }, "Please specify a valid bank or giro account number");
    n.validator.addMethod("bic", function(n, t) {
        return this.optional(t) || /^([A-Z]{6}[A-Z2-9][A-NP-Z1-2])(X{3}|[A-WY-Z0-9][A-Z0-9]{2})?$/.test(n)
    }, "Please specify a valid BIC code");
    n.validator.addMethod("cifES", function(n) {
        "use strict";
        var f, i, r, u, e, o, t = [];
        if (n = n.toUpperCase(), !n.match("((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)")) return !1;
        for (r = 0; 9 > r; r++) t[r] = parseInt(n.charAt(r), 10);
        for (i = t[2] + t[4] + t[6], u = 1; 8 > u; u += 2) e = (2 * t[u]).toString(), o = e.charAt(1), i += parseInt(e.charAt(0), 10) + ("" === o ? 0 : parseInt(o, 10));
        return /^[ABCDEFGHJNPQRSUVW]{1}/.test(n) ? (i += "", f = 10 - parseInt(i.charAt(i.length - 1), 10), n += f, t[8].toString() === String.fromCharCode(64 + f) || t[8].toString() === n.charAt(n.length - 1)) : !1
    }, "Please specify a valid CIF number.");
    n.validator.addMethod("creditcardtypes", function(n, t, i) {
        if (/[^0-9\-]+/.test(n)) return !1;
        n = n.replace(/\D/g, "");
        var r = 0;
        return i.mastercard && (r |= 1), i.visa && (r |= 2), i.amex && (r |= 4), i.dinersclub && (r |= 8), i.enroute && (r |= 16), i.discover && (r |= 32), i.jcb && (r |= 64), i.unknown && (r |= 128), i.all && (r = 255), 1 & r && /^(5[12345])/.test(n) ? 16 === n.length : 2 & r && /^(4)/.test(n) ? 16 === n.length : 4 & r && /^(3[47])/.test(n) ? 15 === n.length : 8 & r && /^(3(0[012345]|[68]))/.test(n) ? 14 === n.length : 16 & r && /^(2(014|149))/.test(n) ? 15 === n.length : 32 & r && /^(6011)/.test(n) ? 16 === n.length : 64 & r && /^(3)/.test(n) ? 16 === n.length : 64 & r && /^(2131|1800)/.test(n) ? 15 === n.length : 128 & r ? !0 : !1
    }, "Please enter a valid credit card number.");
    n.validator.addMethod("currency", function(n, t, i) {
        var u, f = "string" == typeof i,
            r = f ? i : i[0],
            e = f ? !0 : i[1];
        return r = r.replace(/,/g, ""), r = e ? r + "]" : r + "]?", u = "^[" + r + "([1-9]{1}[0-9]{0,2}(\\,[0-9]{3})*(\\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\\.[0-9]{0,2})?|0(\\.[0-9]{0,2})?|(\\.[0-9]{1,2})?)$", u = new RegExp(u), this.optional(t) || u.test(n)
    }, "Please specify a valid currency");
    n.validator.addMethod("dateFA", function(n, t) {
        return this.optional(t) || /^[1-4]\d{3}\/((0?[1-6]\/((3[0-1])|([1-2][0-9])|(0?[1-9])))|((1[0-2]|(0?[7-9]))\/(30|([1-2][0-9])|(0?[1-9]))))$/.test(n)
    }, "Please enter a correct date");
    n.validator.addMethod("dateITA", function(n, t) {
        var i, u, f, e, r, o = !1;
        return /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(n) ? (i = n.split("/"), u = parseInt(i[0], 10), f = parseInt(i[1], 10), e = parseInt(i[2], 10), r = new Date(e, f - 1, u, 12, 0, 0, 0), o = r.getUTCFullYear() === e && r.getUTCMonth() === f - 1 && r.getUTCDate() === u ? !0 : !1) : o = !1, this.optional(t) || o
    }, "Please enter a correct date");
    n.validator.addMethod("dateNL", function(n, t) {
        return this.optional(t) || /^(0?[1-9]|[12]\d|3[01])[\.\/\-](0?[1-9]|1[012])[\.\/\-]([12]\d)?(\d\d)$/.test(n)
    }, "Please enter a correct date");
    n.validator.addMethod("extension", function(n, t, i) {
        return i = "string" == typeof i ? i.replace(/,/g, "|") : "png|jpe?g|gif", this.optional(t) || n.match(new RegExp(".(" + i + ")$", "i"))
    }, n.validator.format("Please enter a value with a valid extension."));
    n.validator.addMethod("giroaccountNL", function(n, t) {
        return this.optional(t) || /^[0-9]{1,7}$/.test(n)
    }, "Please specify a valid giro account number");
    n.validator.addMethod("iban", function(n, t) {
        if (this.optional(t)) return !0;
        var c, f, e, l, o, a, v, r, u, i = n.replace(/ /g, "").toUpperCase(),
            s = "",
            y = !0,
            h = "",
            p = "";
        if (!/^([a-zA-Z0-9]{4} ){2,8}[a-zA-Z0-9]{1,4}|[a-zA-Z0-9]{12,34}$/.test(i) || (c = i.substring(0, 2), a = {
                AL: "\\d{8}[\\dA-Z]{16}",
                AD: "\\d{8}[\\dA-Z]{12}",
                AT: "\\d{16}",
                AZ: "[\\dA-Z]{4}\\d{20}",
                BE: "\\d{12}",
                BH: "[A-Z]{4}[\\dA-Z]{14}",
                BA: "\\d{16}",
                BR: "\\d{23}[A-Z][\\dA-Z]",
                BG: "[A-Z]{4}\\d{6}[\\dA-Z]{8}",
                CR: "\\d{17}",
                HR: "\\d{17}",
                CY: "\\d{8}[\\dA-Z]{16}",
                CZ: "\\d{20}",
                DK: "\\d{14}",
                DO: "[A-Z]{4}\\d{20}",
                EE: "\\d{16}",
                FO: "\\d{14}",
                FI: "\\d{14}",
                FR: "\\d{10}[\\dA-Z]{11}\\d{2}",
                GE: "[\\dA-Z]{2}\\d{16}",
                DE: "\\d{18}",
                GI: "[A-Z]{4}[\\dA-Z]{15}",
                GR: "\\d{7}[\\dA-Z]{16}",
                GL: "\\d{14}",
                GT: "[\\dA-Z]{4}[\\dA-Z]{20}",
                HU: "\\d{24}",
                IS: "\\d{22}",
                IE: "[\\dA-Z]{4}\\d{14}",
                IL: "\\d{19}",
                IT: "[A-Z]\\d{10}[\\dA-Z]{12}",
                KZ: "\\d{3}[\\dA-Z]{13}",
                KW: "[A-Z]{4}[\\dA-Z]{22}",
                LV: "[A-Z]{4}[\\dA-Z]{13}",
                LB: "\\d{4}[\\dA-Z]{20}",
                LI: "\\d{5}[\\dA-Z]{12}",
                LT: "\\d{16}",
                LU: "\\d{3}[\\dA-Z]{13}",
                MK: "\\d{3}[\\dA-Z]{10}\\d{2}",
                MT: "[A-Z]{4}\\d{5}[\\dA-Z]{18}",
                MR: "\\d{23}",
                MU: "[A-Z]{4}\\d{19}[A-Z]{3}",
                MC: "\\d{10}[\\dA-Z]{11}\\d{2}",
                MD: "[\\dA-Z]{2}\\d{18}",
                ME: "\\d{18}",
                NL: "[A-Z]{4}\\d{10}",
                NO: "\\d{11}",
                PK: "[\\dA-Z]{4}\\d{16}",
                PS: "[\\dA-Z]{4}\\d{21}",
                PL: "\\d{24}",
                PT: "\\d{21}",
                RO: "[A-Z]{4}[\\dA-Z]{16}",
                SM: "[A-Z]\\d{10}[\\dA-Z]{12}",
                SA: "\\d{2}[\\dA-Z]{18}",
                RS: "\\d{18}",
                SK: "\\d{20}",
                SI: "\\d{15}",
                ES: "\\d{20}",
                SE: "\\d{20}",
                CH: "\\d{5}[\\dA-Z]{12}",
                TN: "\\d{20}",
                TR: "\\d{5}[\\dA-Z]{17}",
                AE: "\\d{3}\\d{16}",
                GB: "[A-Z]{4}\\d{14}",
                VG: "[\\dA-Z]{4}\\d{16}"
            }, o = a[c], "undefined" != typeof o && (v = new RegExp("^[A-Z]{2}\\d{2}" + o + "$", ""), !v.test(i)))) return !1;
        for (f = i.substring(4, i.length) + i.substring(0, 4), r = 0; r < f.length; r++) e = f.charAt(r), "0" !== e && (y = !1), y || (s += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(e));
        for (u = 0; u < s.length; u++) l = s.charAt(u), p = "" + h + l, h = p % 97;
        return 1 === h
    }, "Please specify a valid IBAN");
    n.validator.addMethod("integer", function(n, t) {
        return this.optional(t) || /^-?\d+$/.test(n)
    }, "A positive or negative non-decimal number please");
    n.validator.addMethod("ipv4", function(n, t) {
        return this.optional(t) || /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i.test(n)
    }, "Please enter a valid IP v4 address.");
    n.validator.addMethod("ipv6", function(n, t) {
        return this.optional(t) || /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i.test(n)
    }, "Please enter a valid IP v6 address.");
    n.validator.addMethod("lettersonly", function(n, t) {
        return this.optional(t) || /^[a-z]+$/i.test(n)
    }, "Letters only please");
    n.validator.addMethod("letterswithbasicpunc", function(n, t) {
        return this.optional(t) || /^[a-z\-.,()'"\s]+$/i.test(n)
    }, "Letters or punctuation only please");
    n.validator.addMethod("mobileNL", function(n, t) {
        return this.optional(t) || /^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)6((\s|\s?\-\s?)?[0-9]){8}$/.test(n)
    }, "Please specify a valid mobile number");
    n.validator.addMethod("mobileUK", function(n, t) {
        return n = n.replace(/\(|\)|\s+|-/g, ""), this.optional(t) || n.length > 9 && n.match(/^(?:(?:(?:00\s?|\+)44\s?|0)7(?:[1345789]\d{2}|624)\s?\d{3}\s?\d{3})$/)
    }, "Please specify a valid mobile number");
    n.validator.addMethod("nieES", function(n) {
        "use strict";
        return n = n.toUpperCase(), n.match("((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)") ? /^[T]{1}/.test(n) ? n[8] === /^[T]{1}[A-Z0-9]{8}$/.test(n) : /^[XYZ]{1}/.test(n) ? n[8] === "TRWAGMYFPDXBNJZSQVHLCKE".charAt(n.replace("X", "0").replace("Y", "1").replace("Z", "2").substring(0, 8) % 23) : !1 : !1
    }, "Please specify a valid NIE number.");
    n.validator.addMethod("nifES", function(n) {
        "use strict";
        return n = n.toUpperCase(), n.match("((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)") ? /^[0-9]{8}[A-Z]{1}$/.test(n) ? "TRWAGMYFPDXBNJZSQVHLCKE".charAt(n.substring(8, 0) % 23) === n.charAt(8) : /^[KLM]{1}/.test(n) ? n[8] === String.fromCharCode(64) : !1 : !1
    }, "Please specify a valid NIF number.");
    n.validator.addMethod("nowhitespace", function(n, t) {
        return this.optional(t) || /^\S+$/i.test(n)
    }, "No white space please");
    n.validator.addMethod("pattern", function(n, t, i) {
        return this.optional(t) ? !0 : ("string" == typeof i && (i = new RegExp("^(?:" + i + ")$")), i.test(n))
    }, "Invalid format.");
    n.validator.addMethod("phoneNL", function(n, t) {
        return this.optional(t) || /^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)[1-9]((\s|\s?\-\s?)?[0-9]){8}$/.test(n)
    }, "Please specify a valid phone number.");
    n.validator.addMethod("phoneUK", function(n, t) {
        return n = n.replace(/\(|\)|\s+|-/g, ""), this.optional(t) || n.length > 9 && n.match(/^(?:(?:(?:00\s?|\+)44\s?)|(?:\(?0))(?:\d{2}\)?\s?\d{4}\s?\d{4}|\d{3}\)?\s?\d{3}\s?\d{3,4}|\d{4}\)?\s?(?:\d{5}|\d{3}\s?\d{3})|\d{5}\)?\s?\d{4,5})$/)
    }, "Please specify a valid phone number");
    n.validator.addMethod("phoneUS", function(n, t) {
        return n = n.replace(/\s+/g, ""), this.optional(t) || n.length > 9 && n.match(/^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/)
    }, "Please specify a valid phone number");
    n.validator.addMethod("phonesUK", function(n, t) {
        return n = n.replace(/\(|\)|\s+|-/g, ""), this.optional(t) || n.length > 9 && n.match(/^(?:(?:(?:00\s?|\+)44\s?|0)(?:1\d{8,9}|[23]\d{9}|7(?:[1345789]\d{8}|624\d{6})))$/)
    }, "Please specify a valid uk phone number");
    n.validator.addMethod("postalCodeCA", function(n, t) {
        return this.optional(t) || /^[ABCEGHJKLMNPRSTVXY]\d[A-Z] \d[A-Z]\d$/.test(n)
    }, "Please specify a valid postal code");
    n.validator.addMethod("postalcodeBR", function(n, t) {
        return this.optional(t) || /^\d{2}.\d{3}-\d{3}?$|^\d{5}-?\d{3}?$/.test(n)
    }, "Informe um CEP válido.");
    n.validator.addMethod("postalcodeIT", function(n, t) {
        return this.optional(t) || /^\d{5}$/.test(n)
    }, "Please specify a valid postal code");
    n.validator.addMethod("postalcodeNL", function(n, t) {
        return this.optional(t) || /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/.test(n)
    }, "Please specify a valid postal code");
    n.validator.addMethod("postcodeUK", function(n, t) {
        return this.optional(t) || /^((([A-PR-UWYZ][0-9])|([A-PR-UWYZ][0-9][0-9])|([A-PR-UWYZ][A-HK-Y][0-9])|([A-PR-UWYZ][A-HK-Y][0-9][0-9])|([A-PR-UWYZ][0-9][A-HJKSTUW])|([A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY]))\s?([0-9][ABD-HJLNP-UW-Z]{2})|(GIR)\s?(0AA))$/i.test(n)
    }, "Please specify a valid UK postcode");
    n.validator.addMethod("require_from_group", function(t, i, r) {
        var u = n(r[1], i.form),
            f = u.eq(0),
            e = f.data("valid_req_grp") ? f.data("valid_req_grp") : n.extend({}, this),
            o = u.filter(function() {
                return e.elementValue(this)
            }).length >= r[0];
        return f.data("valid_req_grp", e), n(i).data("being_validated") || (u.data("being_validated", !0), u.each(function() {
            e.element(this)
        }), u.data("being_validated", !1)), o
    }, n.validator.format("Please fill at least {0} of these fields."));
    n.validator.addMethod("skip_or_fill_minimum", function(t, i, r) {
        var u = n(r[1], i.form),
            f = u.eq(0),
            e = f.data("valid_skip") ? f.data("valid_skip") : n.extend({}, this),
            o = u.filter(function() {
                return e.elementValue(this)
            }).length,
            s = 0 === o || o >= r[0];
        return f.data("valid_skip", e), n(i).data("being_validated") || (u.data("being_validated", !0), u.each(function() {
            e.element(this)
        }), u.data("being_validated", !1)), s
    }, n.validator.format("Please either skip these fields or fill at least {0} of them."));
    jQuery.validator.addMethod("stateUS", function(n, t, i) {
        var r, u = "undefined" == typeof i,
            o = u || "undefined" == typeof i.caseSensitive ? !1 : i.caseSensitive,
            f = u || "undefined" == typeof i.includeTerritories ? !1 : i.includeTerritories,
            e = u || "undefined" == typeof i.includeMilitary ? !1 : i.includeMilitary;
        return r = f || e ? f && e ? "^(A[AEKLPRSZ]|C[AOT]|D[CE]|FL|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEINOPST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$" : f ? "^(A[KLRSZ]|C[AOT]|D[CE]|FL|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEINOPST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$" : "^(A[AEKLPRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])$" : "^(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])$", r = o ? new RegExp(r) : new RegExp(r, "i"), this.optional(t) || r.test(n)
    }, "Please specify a valid state");
    n.validator.addMethod("strippedminlength", function(t, i, r) {
        return n(t).text().length >= r
    }, n.validator.format("Please enter at least {0} characters"));
    n.validator.addMethod("time", function(n, t) {
        return this.optional(t) || /^([01]\d|2[0-3])(:[0-5]\d){1,2}$/.test(n)
    }, "Please enter a valid time, between 00:00 and 23:59");
    n.validator.addMethod("time12h", function(n, t) {
        return this.optional(t) || /^((0?[1-9]|1[012])(:[0-5]\d){1,2}(\ ?[AP]M))$/i.test(n)
    }, "Please enter a valid time in 12-hour am/pm format");
    n.validator.addMethod("url2", function(n, t) {
        return this.optional(t) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(n)
    }, n.validator.messages.url);
    n.validator.addMethod("vinUS", function(n) {
        if (17 !== n.length) return !1;
        for (var r, t, e, u, f, o = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], h = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 7, 9, 2, 3, 4, 5, 6, 7, 8, 9], c = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2], s = 0, i = 0; 17 > i; i++) {
            if (e = c[i], t = n.slice(i, i + 1), 8 === i && (f = t), isNaN(t)) {
                for (r = 0; r < o.length; r++)
                    if (t.toUpperCase() === o[r]) {
                        t = h[r];
                        t *= e;
                        isNaN(f) && 8 === r && (f = o[r]);
                        break
                    }
            } else t *= e;
            s += t
        }
        return u = s % 11, 10 === u && (u = "X"), u === f ? !0 : !1
    }, "The specified vehicle identification number (VIN) is invalid.");
    n.validator.addMethod("zipcodeUS", function(n, t) {
        return this.optional(t) || /^\d{5}(-\d{4})?$/.test(n)
    }, "The specified US ZIP Code is invalid");
    n.validator.addMethod("ziprange", function(n, t) {
        return this.optional(t) || /^90[2-5]\d\{2\}-\d{4}$/.test(n)
    }, "Your ZIP-code must be in the range 902xx-xxxx to 905xx-xxxx")
})