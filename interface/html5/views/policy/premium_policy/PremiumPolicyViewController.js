PremiumPolicyViewController = BaseViewController.extend( {
	el: '#premium_policy_view_container',
	type_array: null,
	pay_type_array: null,
	include_holiday_type_array: null,

	branch_selection_type_array: null,
	department_selection_type_array: null,

	job_group_selection_type_array: null,
	job_selection_type_array: null,

	job_group_array: null,
	job_item_group_array: null,

	job_item_group_selection_type_array: null,
	job_item_selection_type_array: null,

	job_group_api: null,
	job_item_group_api: null,
	date_api: null,

	initialize: function() {
		this._super( 'initialize' );
		this.edit_view_tpl = 'PremiumPolicyEditView.html';
		this.permission_id = 'premium_policy';
		this.viewId = 'PremiumPolicy';
		this.script_name = 'PremiumPolicyView';
		this.table_name_key = 'premium_policy';
		this.context_menu_name = $.i18n._( 'Premium Policy' );
		this.navigation_label = $.i18n._( 'Premium Policy' ) + ':';
		this.api = new (APIFactory.getAPIClass( 'APIPremiumPolicy' ))();

		if ( ( LocalCacheData.getCurrentCompany().product_edition_id >= 20 ) ) {
			this.job_group_api = new (APIFactory.getAPIClass( 'APIJobGroup' ))();
			this.job_item_group_api = new (APIFactory.getAPIClass( 'APIJobItemGroup' ))();
		}

		this.date_api = new (APIFactory.getAPIClass( 'APIDate' ))();
		this.render();
		this.buildContextMenu();

		this.initData();
		this.setSelectRibbonMenuIfNecessary( 'PremiumPolicy' );

	},

	initOptions: function() {
		var $this = this;
		this.initDropDownOption( 'type' );
		this.initDropDownOption( 'pay_type' );
		this.initDropDownOption( 'include_holiday_type' );
		this.initDropDownOption( 'branch_selection_type' );
		this.initDropDownOption( 'department_selection_type' );
		this.initDropDownOption( 'job_group_selection_type' );
		this.initDropDownOption( 'job_selection_type' );
		this.initDropDownOption( 'job_item_group_selection_type' );
		this.initDropDownOption( 'job_item_selection_type' );

		if ( ( LocalCacheData.getCurrentCompany().product_edition_id >= 20 ) ) {
			this.job_group_api.getJobGroup( '', false, false, {onResult: function( res ) {

				res = res.getResult();
				res = Global.buildTreeRecord( res );
				$this.job_group_array = res;

			}} );

			this.job_item_group_api.getJobItemGroup( '', false, false, {onResult: function( res ) {

				res = res.getResult();
				res = Global.buildTreeRecord( res );
				$this.job_item_group_array = res;

			}} );
		}

	},

	buildEditViewUI: function() {

		this._super( 'buildEditViewUI' );

		var $this = this;

		var tab_0_label = this.edit_view.find( 'a[ref=tab0]' );
		var tab_1_label = this.edit_view.find( 'a[ref=tab1]' );
		var tab_2_label = this.edit_view.find( 'a[ref=tab2]' );
		var tab_3_label = this.edit_view.find( 'a[ref=tab3]' );
		var tab_4_label = this.edit_view.find( 'a[ref=tab4]' );
		var tab_5_label = this.edit_view.find( 'a[ref=tab5]' );
		var tab_6_label = this.edit_view.find( 'a[ref=tab6]' );

		tab_0_label.text( $.i18n._( 'Premium Policy' ) );
		tab_1_label.text( $.i18n._( 'Date/Time Criteria' ) );
		tab_2_label.text( $.i18n._( 'Differential Criteria' ) );
		tab_3_label.text( $.i18n._( 'Meal/Break Criteria' ) );
		tab_4_label.text( $.i18n._( 'CallBack Criteria' ) );
		tab_5_label.text( $.i18n._( 'Minimum Shift Time Criteria' ) );
		tab_6_label.text( $.i18n._( 'Audit' ) );

		this.navigation.AComboBox( {
			api_class: (APIFactory.getAPIClass( 'APIPremiumPolicy' )),
			id: this.script_name + '_navigation',
			allow_multiple_selection: false,
			layout_name: ALayoutIDs.PREMIUM_POLICY,
			navigation_mode: true,
			show_search_inputs: true
		} );

		this.setNavigation();

		//Tab 0 start

		var tab0 = this.edit_view_tab.find( '#tab0' );

		var tab0_column1 = tab0.find( '.first-column' );

		this.edit_view_tabs[0] = [];

		this.edit_view_tabs[0].push( tab0_column1 );

		//Name
		var form_item_input = Global.loadWidgetByName( FormItemType.TEXT_INPUT );

		form_item_input.TTextInput( {field: 'name', width: 150} );
		this.addEditFieldToColumn( $.i18n._( 'Name' ), form_item_input, tab0_column1, '' );

		//Type
		form_item_input = Global.loadWidgetByName( FormItemType.COMBO_BOX );

		form_item_input.TComboBox( {field: 'type_id', set_empty: false} );
		form_item_input.setSourceData( Global.addFirstItemToArray( $this.type_array ) );
		this.addEditFieldToColumn( $.i18n._( 'Type' ), form_item_input, tab0_column1 );

		//Hours/Pay Criteria
		form_item_input = Global.loadWidgetByName( FormItemType.SEPARATED_BOX );
		form_item_input.SeparatedBox( {label: $.i18n._( 'Hours/Pay Criteria' )} );
		this.addEditFieldToColumn( null, form_item_input, tab0_column1 );

		//Minimum Time
		form_item_input = Global.loadWidgetByName( FormItemType.TEXT_INPUT );
		form_item_input.TTextInput( {field: 'minimum_time', width: 65, need_parser_sec: true} );

		var widgetContainer = $( "<div class='widget-h-box'></div>" );
		var label = $( "<span class='widget-right-label'> " + LocalCacheData.getLoginUserPreference().time_unit_format_display + " " + $.i18n._( '(Use 0 for no minimum)' ) + "</span>" );

		widgetContainer.append( form_item_input );
		widgetContainer.append( label );
		this.addEditFieldToColumn( $.i18n._( 'Minimum Time' ), form_item_input, tab0_column1, '', widgetContainer );

		//Maximum Time
		form_item_input = Global.loadWidgetByName( FormItemType.TEXT_INPUT );
		form_item_input.TTextInput( {field: 'maximum_time', width: 65, need_parser_sec: true} );

		widgetContainer = $( "<div class='widget-h-box'></div>" );
		label = $( "<span class='widget-right-label'> " + LocalCacheData.getLoginUserPreference().time_unit_format_display + " " + $.i18n._( '(Use 0 for no maximum)' ) + "</span>" );

		widgetContainer.append( form_item_input );
		widgetContainer.append( label );
		this.addEditFieldToColumn( $.i18n._( 'Maximum Time' ), form_item_input, tab0_column1, '', widgetContainer );

		//Include Meal Policy in Calculation
		form_item_input = Global.loadWidgetByName( FormItemType.CHECKBOX );
		form_item_input.TCheckbox( {field: 'include_meal_policy'} );
		this.addEditFieldToColumn( $.i18n._( 'Include Meal Policy in Calculation' ), form_item_input, tab0_column1 );

		//Include Break Policy in Calculation
		form_item_input = Global.loadWidgetByName( FormItemType.CHECKBOX );
		form_item_input.TCheckbox( {field: 'include_break_policy'} );
		this.addEditFieldToColumn( $.i18n._( 'Include Break Policy in Calculation' ), form_item_input, tab0_column1 );

		//Include Partial Punches
		form_item_input = Global.loadWidgetByName( FormItemType.CHECKBOX );
		form_item_input.TCheckbox( {field: 'include_partial_punch'} );
		this.addEditFieldToColumn( $.i18n._( 'Include Partial Punches' ), form_item_input, tab0_column1, '', null, true );

		//Pay Type
		form_item_input = Global.loadWidgetByName( FormItemType.COMBO_BOX );

		form_item_input.TComboBox( {field: 'pay_type_id', set_empty: false} );
		form_item_input.setSourceData( Global.addFirstItemToArray( $this.pay_type_array ) );
		this.addEditFieldToColumn( $.i18n._( 'Pay Type' ), form_item_input, tab0_column1 );

		// Premium
		// Hourly Rate
		//Rate
		form_item_input = Global.loadWidgetByName( FormItemType.TEXT_INPUT );
		form_item_input.TTextInput( {field: 'rate', width: 65} );

		widgetContainer = $( "<div class='widget-h-box'></div>" );
		label = $( "<span class='widget-right-label'> (" + $.i18n._( 'ie' ) + ': ' + $.i18n._( '1.5 for time and a half' ) + ")</span>" );

		widgetContainer.append( form_item_input );
		widgetContainer.append( label );
		this.addEditFieldToColumn( $.i18n._( 'Rate' ), form_item_input, tab0_column1, '', widgetContainer, true );

		//Wage Group
		form_item_input = Global.loadWidgetByName( FormItemType.AWESOME_BOX );
		form_item_input.AComboBox( {
			api_class: (APIFactory.getAPIClass( 'APIWageGroup' )),
			allow_multiple_selection: false,
			layout_name: ALayoutIDs.WAGE_GROUP,
			show_search_inputs: true,
			set_default: true,
			field: 'wage_group_id'
		} );
		this.addEditFieldToColumn( $.i18n._( 'Wage Group' ), form_item_input, tab0_column1, '', null, true );

		//Pay Stub Account
		form_item_input = Global.loadWidgetByName( FormItemType.AWESOME_BOX );
		form_item_input.AComboBox( {
			api_class: (APIFactory.getAPIClass( 'APIPayStubEntryAccount' )),
			allow_multiple_selection: false,
			layout_name: ALayoutIDs.PAY_STUB_ACCOUNT,
			show_search_inputs: true,
			set_empty: true,
			field: 'pay_stub_entry_account_id'
		} );
		this.addEditFieldToColumn( $.i18n._( 'Pay Stub Account' ), form_item_input, tab0_column1 );

		// Accrual Policy
		form_item_input = Global.loadWidgetByName( FormItemType.AWESOME_BOX );
		form_item_input.AComboBox( {
			api_class: (APIFactory.getAPIClass( 'APIAccrualPolicy' )),
			allow_multiple_selection: false,
			layout_name: ALayoutIDs.ACCRUAL_POLICY,
			show_search_inputs: true,
			set_empty: true,
			field: 'accrual_policy_id'
		} );
		this.addEditFieldToColumn( $.i18n._( 'Accrual Policy' ), form_item_input, tab0_column1, '' );

		// Accrual Rate
		form_item_input = Global.loadWidgetByName( FormItemType.TEXT_INPUT );

		form_item_input.TTextInput( {field: 'accrual_rate'} );
		this.addEditFieldToColumn( $.i18n._( 'Accrual Rate' ), form_item_input, tab0_column1, '', null, true );

		//Tab 1 start

		var tab1 = this.edit_view_tab.find( '#tab1' );

		var tab1_column1 = tab1.find( '.first-column' );

		this.edit_view_tabs[1] = [];

		this.edit_view_tabs[1].push( tab1_column1 );

		// Start Date
		form_item_input = Global.loadWidgetByName( FormItemType.DATE_PICKER );

		form_item_input.TDatePicker( {field: 'start_date'} );

		widgetContainer = $( "<div class='widget-h-box'></div>" );

		label = $( "<span class='widget-right-label'> " + $.i18n._( 'ie' ) + ' : ' + LocalCacheData.getLoginUserPreference().date_format_example + " " + $.i18n._( "(Leave blank for no start date)" ) + "</span>" );

		widgetContainer.append( form_item_input );
		widgetContainer.append( label );
		this.addEditFieldToColumn( $.i18n._( 'Start Date' ), form_item_input, tab1_column1, '', widgetContainer );

		// End Date

		form_item_input = Global.loadWidgetByName( FormItemType.DATE_PICKER );

		form_item_input.TDatePicker( {field: 'end_date'} );

		widgetContainer = $( "<div class='widget-h-box'></div>" );
		label = $( "<span class='widget-right-label'> " + $.i18n._( 'ie' ) + ' : ' + LocalCacheData.getLoginUserPreference().date_format_example + " " + $.i18n._( "(Leave blank for no end date)" ) + "</span>" );

		widgetContainer.append( form_item_input );
		widgetContainer.append( label );
		this.addEditFieldToColumn( $.i18n._( 'End Date' ), form_item_input, tab1_column1, '', widgetContainer );

		// Start Time
		form_item_input = Global.loadWidgetByName( FormItemType.TEXT_INPUT );
		form_item_input.TTextInput( {field: 'start_time', width: 80} );

		widgetContainer = $( "<div class='widget-h-box'></div>" );
		label = $( "<span class='widget-right-label'> " + $.i18n._( 'ie' ) + ' : ' + LocalCacheData.getLoginUserPreference().time_format_display + " " + $.i18n._( "(Leave blank for no start time)" ) + "</span>" );

		widgetContainer.append( form_item_input );
		widgetContainer.append( label );
		this.addEditFieldToColumn( $.i18n._( 'Start Time' ), form_item_input, tab1_column1, '', widgetContainer );

		// End Time
		form_item_input = Global.loadWidgetByName( FormItemType.TEXT_INPUT );
		form_item_input.TTextInput( {field: 'end_time', width: 80} );

		widgetContainer = $( "<div class='widget-h-box'></div>" );
		label = $( "<span class='widget-right-label'> " + $.i18n._( 'ie' ) + ' : ' + LocalCacheData.getLoginUserPreference().time_format_display + " " + $.i18n._( "(Leave blank for no end time)" ) + "</span>" );

		widgetContainer.append( form_item_input );
		widgetContainer.append( label );
		this.addEditFieldToColumn( $.i18n._( 'End Time' ), form_item_input, tab1_column1, '', widgetContainer );

		// Daily Time

		// daily_trigger_time

		var form_item_daily_trigger_time_input = Global.loadWidgetByName( FormItemType.TEXT_INPUT );
		form_item_daily_trigger_time_input.TTextInput( {field: 'daily_trigger_time1', width: 65, need_parser_sec: true} );

		var form_item_maximum_daily_trigger_time_input = Global.loadWidgetByName( FormItemType.TEXT_INPUT );
		form_item_maximum_daily_trigger_time_input.TTextInput( {field: 'maximum_daily_trigger_time', width: 65, need_parser_sec: true} );

		widgetContainer = $( "<div class='widget-h-box'></div>" );

		var label_1 = $( "<span class='widget-right-label'> " + $.i18n._( 'Active After' ) + ': ' + " </span>" );
		var label_2 = $( "<span class='widget-right-label'> " + $.i18n._( 'Active Before' ) + ': ' + " </span>" );
		var label_3 = $( "<span class='widget-right-label'> " + LocalCacheData.getLoginUserPreference().time_unit_format_display + " </span>" );

		widgetContainer.append( label_1 );
		widgetContainer.append( form_item_daily_trigger_time_input );
		widgetContainer.append( label_2 );
		widgetContainer.append( form_item_maximum_daily_trigger_time_input );
		widgetContainer.append( label_3 );

		this.addEditFieldToColumn( $.i18n._( 'Daily Time' ), [form_item_daily_trigger_time_input, form_item_maximum_daily_trigger_time_input], tab1_column1, '', widgetContainer );

		// Weekly Time
		var form_item_weekly_trigger_time_input = Global.loadWidgetByName( FormItemType.TEXT_INPUT );
		form_item_weekly_trigger_time_input.TTextInput( {field: 'weekly_trigger_time', width: 65, need_parser_sec: true} );

		var form_item_maximum_weekly_trigger_time_input = Global.loadWidgetByName( FormItemType.TEXT_INPUT );
		form_item_maximum_weekly_trigger_time_input.TTextInput( {field: 'maximum_weekly_trigger_time', width: 65, need_parser_sec: true} );

		widgetContainer = $( "<div class='widget-h-box'></div>" );

		label_1 = $( "<span class='widget-right-label'> " + $.i18n._( 'Active After' ) + ': ' + " </span>" );
		label_2 = $( "<span class='widget-right-label'> " + $.i18n._( 'Active Before' ) + ': ' + " </span>" );
		label_3 = $( "<span class='widget-right-label'> " + LocalCacheData.getLoginUserPreference().time_unit_format_display + " </span>" );

		widgetContainer.append( label_1 );
		widgetContainer.append( form_item_weekly_trigger_time_input );
		widgetContainer.append( label_2 );
		widgetContainer.append( form_item_maximum_weekly_trigger_time_input );
		widgetContainer.append( label_3 );

		this.addEditFieldToColumn( $.i18n._( 'Weekly Time' ), [form_item_weekly_trigger_time_input, form_item_maximum_weekly_trigger_time_input], tab1_column1, '', widgetContainer );

		// Effective Days
		var form_item_sun_checkbox = Global.loadWidgetByName( FormItemType.CHECKBOX );
		form_item_sun_checkbox.TCheckbox( {field: 'sun'} );

		var form_item_mon_checkbox = Global.loadWidgetByName( FormItemType.CHECKBOX );
		form_item_mon_checkbox.TCheckbox( {field: 'mon'} );

		var form_item_tue_checkbox = Global.loadWidgetByName( FormItemType.CHECKBOX );
		form_item_tue_checkbox.TCheckbox( {field: 'tue'} );

		var form_item_wed_checkbox = Global.loadWidgetByName( FormItemType.CHECKBOX );
		form_item_wed_checkbox.TCheckbox( {field: 'wed'} );

		var form_item_thu_checkbox = Global.loadWidgetByName( FormItemType.CHECKBOX );
		form_item_thu_checkbox.TCheckbox( {field: 'thu'} );

		var form_item_fri_checkbox = Global.loadWidgetByName( FormItemType.CHECKBOX );
		form_item_fri_checkbox.TCheckbox( {field: 'fri'} );

		var form_item_sat_checkbox = Global.loadWidgetByName( FormItemType.CHECKBOX );
		form_item_sat_checkbox.TCheckbox( {field: 'sat'} );

		widgetContainer = $( "<div class='widget-h-box'></div>" );

		var sun = $( "<span class='widget-top-label'> " + $.i18n._( 'Sun' ) + " <br> " + " </span>" );
		var mon = $( "<span class='widget-top-label'> " + $.i18n._( 'Mon' ) + " <br> " + " </span>" );
		var tue = $( "<span class='widget-top-label'> " + $.i18n._( 'Tue' ) + " <br> " + " </span>" );
		var wed = $( "<span class='widget-top-label'> " + $.i18n._( 'Wed' ) + " <br> " + " </span>" );
		var thu = $( "<span class='widget-top-label'> " + $.i18n._( 'Thu' ) + " <br> " + " </span>" );
		var fri = $( "<span class='widget-top-label'> " + $.i18n._( 'Fri' ) + " <br> " + " </span>" );
		var sat = $( "<span class='widget-top-label'> " + $.i18n._( 'Sat' ) + " <br> " + " </span>" );

		sun.append( form_item_sun_checkbox );
		mon.append( form_item_mon_checkbox );
		tue.append( form_item_tue_checkbox );
		wed.append( form_item_wed_checkbox );
		thu.append( form_item_thu_checkbox );
		fri.append( form_item_fri_checkbox );
		sat.append( form_item_sat_checkbox );

		widgetContainer.append( sun );
		widgetContainer.append( mon );
		widgetContainer.append( tue );
		widgetContainer.append( wed );
		widgetContainer.append( thu );
		widgetContainer.append( fri );
		widgetContainer.append( sat );

		this.addEditFieldToColumn( $.i18n._( 'Effective Days' ), [form_item_sun_checkbox, form_item_mon_checkbox, form_item_tue_checkbox, form_item_wed_checkbox, form_item_thu_checkbox, form_item_fri_checkbox, form_item_sat_checkbox], tab1_column1, '', widgetContainer, false, true );

		// Holidays

		form_item_input = Global.loadWidgetByName( FormItemType.COMBO_BOX );

		form_item_input.TComboBox( {field: 'include_holiday_type_id', set_empty: false } );
		form_item_input.setSourceData( Global.addFirstItemToArray( $this.include_holiday_type_array ) );
		this.addEditFieldToColumn( $.i18n._( 'Holidays' ), form_item_input, tab1_column1, '' );

		// Tab2 start

		var tab2 = this.edit_view_tab.find( '#tab2' );

		var tab2_column1 = tab2.find( '.first-column' );

		this.edit_view_tabs[2] = [];

		this.edit_view_tabs[2].push( tab2_column1 );

		// Branches
		var v_box = $( "<div class='v-box'></div>" );

		//Selection Type
		form_item_input = Global.loadWidgetByName( FormItemType.COMBO_BOX );
		form_item_input.TComboBox( {field: 'branch_selection_type_id', set_empty: false} );
		form_item_input.setSourceData( Global.addFirstItemToArray( $this.branch_selection_type_array ) );

		form_item = this.putInputToInsideFormItem( form_item_input, $.i18n._( 'Selection Type' ) );

		v_box.append( form_item );
		v_box.append( "<div class='clear-both-div'></div>" );

		//Selection
		var form_item_input_1 = Global.loadWidgetByName( FormItemType.AWESOME_BOX );

		form_item_input_1.AComboBox( {
			api_class: (APIFactory.getAPIClass( 'APIBranch' )),
			allow_multiple_selection: true,
			layout_name: ALayoutIDs.BRANCH,
			show_search_inputs: true,
			set_empty: true,
			field: 'branch'
		} );

		var form_item = this.putInputToInsideFormItem( form_item_input_1, $.i18n._( 'Selection' ) );

		v_box.append( form_item );

		// Exclude Default
		var form_item_input_2 = Global.loadWidgetByName( FormItemType.CHECKBOX );

		form_item_input_2.TCheckbox( {field: 'exclude_default_branch'} );

		form_item = this.putInputToInsideFormItem( form_item_input_2, $.i18n._( 'Exclude Default' ) );

		v_box.append( form_item );

		this.addEditFieldToColumn( $.i18n._( 'Branches' ), [form_item_input, form_item_input_1, form_item_input_2], tab2_column1, '', v_box, false, true );

		// Departments

		v_box = $( "<div class='v-box'></div>" );

		//Selection Type
		form_item_input = Global.loadWidgetByName( FormItemType.COMBO_BOX );
		form_item_input.TComboBox( {field: 'department_selection_type_id', set_empty: false} );
		form_item_input.setSourceData( Global.addFirstItemToArray( $this.department_selection_type_array ) );

		form_item = this.putInputToInsideFormItem( form_item_input, $.i18n._( 'Selection Type' ) );

		v_box.append( form_item );
		v_box.append( "<div class='clear-both-div'></div>" );

		//Selection
		form_item_input_1 = Global.loadWidgetByName( FormItemType.AWESOME_BOX );

		form_item_input_1.AComboBox( {
			api_class: (APIFactory.getAPIClass( 'APIDepartment' )),
			allow_multiple_selection: true,
			layout_name: ALayoutIDs.DEPARTMENT,
			show_search_inputs: true,
			set_empty: true,
			field: 'department'
		} );

		form_item = this.putInputToInsideFormItem( form_item_input_1, $.i18n._( 'Selection' ) );

		v_box.append( form_item );

		// Exclude Default
		form_item_input_2 = Global.loadWidgetByName( FormItemType.CHECKBOX );

		form_item_input_2.TCheckbox( {field: 'exclude_default_department'} );

		form_item = this.putInputToInsideFormItem( form_item_input_2, $.i18n._( 'Exclude Default' ) );

		v_box.append( form_item );

		this.addEditFieldToColumn( $.i18n._( 'Departments' ), [form_item_input, form_item_input_1, form_item_input_2], tab2_column1, '', v_box, false, true );

		if ( ( LocalCacheData.getCurrentCompany().product_edition_id >= 20 ) ) {
			// Job Groups

			v_box = $( "<div class='v-box'></div>" );

			//Selection Type
			form_item_input = Global.loadWidgetByName( FormItemType.COMBO_BOX );
			form_item_input.TComboBox( {field: 'job_group_selection_type_id', set_empty: false} );
			form_item_input.setSourceData( Global.addFirstItemToArray( $this.job_group_selection_type_array ) );

			form_item = this.putInputToInsideFormItem( form_item_input, $.i18n._( 'Selection Type' ) );

			v_box.append( form_item );
			v_box.append( "<div class='clear-both-div'></div>" );

			//Selection
			form_item_input_1 = Global.loadWidgetByName( FormItemType.AWESOME_BOX );

			form_item_input_1.AComboBox( {
				tree_mode: true,
				allow_multiple_selection: true,
				layout_name: ALayoutIDs.TREE_COLUMN,
				set_empty: true,
				field: 'job_group'
			} );

			form_item_input_1.setSourceData( Global.addFirstItemToArray( $this.job_group_array ) );

			form_item = this.putInputToInsideFormItem( form_item_input_1, $.i18n._( 'Selection' ) );

			v_box.append( form_item );

			this.addEditFieldToColumn( $.i18n._( 'Job Groups' ), [form_item_input, form_item_input_1], tab2_column1, '', v_box, false, true );

			// Jobs
			v_box = $( "<div class='v-box'></div>" );

			//Selection Type
			form_item_input = Global.loadWidgetByName( FormItemType.COMBO_BOX );
			form_item_input.TComboBox( {field: 'job_selection_type_id', set_empty: false} );
			form_item_input.setSourceData( Global.addFirstItemToArray( $this.job_selection_type_array ) );

			form_item = this.putInputToInsideFormItem( form_item_input, $.i18n._( 'Selection Type' ) );

			v_box.append( form_item );
			v_box.append( "<div class='clear-both-div'></div>" );

			//Selection
			form_item_input_1 = Global.loadWidgetByName( FormItemType.AWESOME_BOX );

			form_item_input_1.AComboBox( {
				api_class: (APIFactory.getAPIClass( 'APIJob' )),
				allow_multiple_selection: true,
				layout_name: ALayoutIDs.JOB,
				show_search_inputs: true,
				set_empty: true,
				field: 'job'
			} );

			form_item = this.putInputToInsideFormItem( form_item_input_1, $.i18n._( 'Selection' ) );

			v_box.append( form_item );

			this.addEditFieldToColumn( $.i18n._( 'Jobs' ), [form_item_input, form_item_input_1], tab2_column1, '', v_box, false, true );

			// Task Groups

			v_box = $( "<div class='v-box'></div>" );

			//Selection Type
			form_item_input = Global.loadWidgetByName( FormItemType.COMBO_BOX );
			form_item_input.TComboBox( {field: 'job_item_group_selection_type_id', set_empty: false} );
			form_item_input.setSourceData( Global.addFirstItemToArray( $this.job_item_group_selection_type_array ) );

			form_item = this.putInputToInsideFormItem( form_item_input, $.i18n._( 'Selection Type' ) );

			v_box.append( form_item );
			v_box.append( "<div class='clear-both-div'></div>" );

			//Selection
			form_item_input_1 = Global.loadWidgetByName( FormItemType.AWESOME_BOX );

			form_item_input_1.AComboBox( {
				tree_mode: true,
				allow_multiple_selection: true,
				layout_name: ALayoutIDs.TREE_COLUMN,
				set_empty: true,
				field: 'job_item_group'
			} );

			form_item_input_1.setSourceData( Global.addFirstItemToArray( $this.job_item_group_array ) );

			form_item = this.putInputToInsideFormItem( form_item_input_1, $.i18n._( 'Selection' ) );

			v_box.append( form_item );

			this.addEditFieldToColumn( $.i18n._( 'Task Groups' ), [form_item_input, form_item_input_1], tab2_column1, '', v_box, false, true );

			// Tasks

			v_box = $( "<div class='v-box'></div>" );

			//Selection Type
			form_item_input = Global.loadWidgetByName( FormItemType.COMBO_BOX );
			form_item_input.TComboBox( {field: 'job_item_selection_type_id', set_empty: false} );
			form_item_input.setSourceData( Global.addFirstItemToArray( $this.job_item_selection_type_array ) );

			form_item = this.putInputToInsideFormItem( form_item_input, $.i18n._( 'Selection Type' ) );

			v_box.append( form_item );
			v_box.append( "<div class='clear-both-div'></div>" );

			//Selection
			form_item_input_1 = Global.loadWidgetByName( FormItemType.AWESOME_BOX );

			form_item_input_1.AComboBox( {
				api_class: (APIFactory.getAPIClass( 'APIJobItem' )),
				allow_multiple_selection: true,
				layout_name: ALayoutIDs.JOB_ITEM,
				show_search_inputs: true,
				set_empty: true,
				field: 'job_item'
			} );

			form_item = this.putInputToInsideFormItem( form_item_input_1, $.i18n._( 'Selection' ) );

			v_box.append( form_item );

			this.addEditFieldToColumn( $.i18n._( 'Tasks' ), [form_item_input, form_item_input_1], tab2_column1, '', v_box, false, true );
		}

		// Tab3 start

		var tab3 = this.edit_view_tab.find( '#tab3' );

		var tab3_column1 = tab3.find( '.first-column' );

		this.edit_view_tabs[3] = [];

		this.edit_view_tabs[3].push( tab3_column1 );

		// Active After Daily Hours
		// daily_trigger_time
		form_item_input = Global.loadWidgetByName( FormItemType.TEXT_INPUT );
		form_item_input.TTextInput( {field: 'daily_trigger_time2', width: 65, need_parser_sec: true} );

		widgetContainer = $( "<div class='widget-h-box'></div>" );
		label = $( "<span class='widget-right-label'> " + $.i18n._( 'ie' ) + ' : ' + LocalCacheData.getLoginUserPreference().time_unit_format_display + "</span>" );

		widgetContainer.append( form_item_input );
		widgetContainer.append( label );
		this.addEditFieldToColumn( $.i18n._( 'Active After Daily Hours' ), form_item_input, tab3_column1, '', widgetContainer );

		// Maximum Time Without A Break
		form_item_input = Global.loadWidgetByName( FormItemType.TEXT_INPUT );
		form_item_input.TTextInput( {field: 'maximum_no_break_time', width: 65, need_parser_sec: true} );

		widgetContainer = $( "<div class='widget-h-box'></div>" );
		label = $( "<span class='widget-right-label'> " + $.i18n._( 'ie' ) + ' : ' + LocalCacheData.getLoginUserPreference().time_unit_format_display + "</span>" );

		widgetContainer.append( form_item_input );
		widgetContainer.append( label );
		this.addEditFieldToColumn( $.i18n._( 'Maximum Time Without A Break' ), form_item_input, tab3_column1, '', widgetContainer );

		// Minimum Time Recognized As Break
		form_item_input = Global.loadWidgetByName( FormItemType.TEXT_INPUT );
		form_item_input.TTextInput( {field: 'minimum_break_time', width: 65, need_parser_sec: true} );

		widgetContainer = $( "<div class='widget-h-box'></div>" );
		label = $( "<span class='widget-right-label'> " + $.i18n._( 'ie' ) + ' : ' + LocalCacheData.getLoginUserPreference().time_unit_format_display + "</span>" );

		widgetContainer.append( form_item_input );
		widgetContainer.append( label );
		this.addEditFieldToColumn( $.i18n._( 'Minimum Time Recognized As Break' ), form_item_input, tab3_column1, '', widgetContainer );

		// Tab4 start

		var tab4 = this.edit_view_tab.find( '#tab4' );

		var tab4_column1 = tab4.find( '.first-column' );

		this.edit_view_tabs[4] = [];

		this.edit_view_tabs[4].push( tab4_column1 );

		// Minimum Time Between Shifts
		form_item_input = Global.loadWidgetByName( FormItemType.TEXT_INPUT );
		form_item_input.TTextInput( {field: 'minimum_time_between_shift1', width: 65, need_parser_sec: true} );

		widgetContainer = $( "<div class='widget-h-box'></div>" );
		label = $( "<span class='widget-right-label'> " + $.i18n._( 'ie' ) + ' : ' + LocalCacheData.getLoginUserPreference().time_unit_format_display + "</span>" );

		widgetContainer.append( form_item_input );
		widgetContainer.append( label );
		this.addEditFieldToColumn( $.i18n._( 'Minimum Time Between Shifts' ), form_item_input, tab4_column1, '', widgetContainer );

		//First Shift Must Be At Least
		form_item_input = Global.loadWidgetByName( FormItemType.TEXT_INPUT );
		form_item_input.TTextInput( {field: 'minimum_first_shift_time', width: 65, need_parser_sec: true} );

		widgetContainer = $( "<div class='widget-h-box'></div>" );
		label = $( "<span class='widget-right-label'> " + $.i18n._( 'ie' ) + ' : ' + LocalCacheData.getLoginUserPreference().time_unit_format_display + "</span>" );

		widgetContainer.append( form_item_input );
		widgetContainer.append( label );
		this.addEditFieldToColumn( $.i18n._( 'First Shift Must Be At Least' ), form_item_input, tab4_column1, '', widgetContainer );

		// Tab5 start

		var tab5 = this.edit_view_tab.find( '#tab5' );

		var tab5_column1 = tab5.find( '.first-column' );

		this.edit_view_tabs[5] = [];

		this.edit_view_tabs[5].push( tab5_column1 );

		// Minimum Shift Time
		form_item_input = Global.loadWidgetByName( FormItemType.TEXT_INPUT );
		form_item_input.TTextInput( {field: 'minimum_shift_time', width: 65, need_parser_sec: true} );

		widgetContainer = $( "<div class='widget-h-box'></div>" );
		label = $( "<span class='widget-right-label'> " + $.i18n._( 'ie' ) + ' : ' + LocalCacheData.getLoginUserPreference().time_unit_format_display + "</span>" );

		widgetContainer.append( form_item_input );
		widgetContainer.append( label );
		this.addEditFieldToColumn( $.i18n._( 'Minimum Shift Time' ), form_item_input, tab5_column1, '', widgetContainer );

		// Minimum Time-Off Between Shifts
		form_item_input = Global.loadWidgetByName( FormItemType.TEXT_INPUT );
		form_item_input.TTextInput( {field: 'minimum_time_between_shift2', width: 65, need_parser_sec: true} );

		widgetContainer = $( "<div class='widget-h-box'></div>" );
		label = $( "<span class='widget-right-label'> " + $.i18n._( 'ie' ) + ' : ' + LocalCacheData.getLoginUserPreference().time_unit_format_display + "</span>" );

		widgetContainer.append( form_item_input );
		widgetContainer.append( label );
		this.addEditFieldToColumn( $.i18n._( 'Minimum Time-Off Between Shifts' ), form_item_input, tab5_column1, '', widgetContainer );

	},

	setCurrentEditRecordData: function() {

		for ( var key in this.current_edit_record ) {
			var widget = this.edit_view_ui_dic[key];
			if ( Global.isSet( widget ) ) {
				switch ( key ) {
					case 'minimum_time_between_shift1':
					case 'minimum_time_between_shift2':
						if ( Global.isSet( this.current_edit_record['minimum_time_between_shift'] ) ) {
							widget.setValue( this.current_edit_record['minimum_time_between_shift'] );
						} else {
							widget.setValue( this.current_edit_record[key] );
						}
						break;
					case 'daily_trigger_time1':
					case 'daily_trigger_time2':
						if ( Global.isSet( this.current_edit_record['daily_trigger_time'] ) ) {
							widget.setValue( this.current_edit_record['daily_trigger_time'] );
						} else {
							widget.setValue( this.current_edit_record[key] );
						}
						break;
					default:
						widget.setValue( this.current_edit_record[key] );
						break;
				}
			}
		}

		this.collectUIDataToCurrentEditRecord();

		this.setEditViewDataDone();
	},

	setEditViewDataDone: function() {

		this._super( 'setEditViewDataDone' );

		this.onTypeChange();
		this.onPayTypeChange();
		this.onBranchSelectionTypeChange();
		this.onDepartmentSelectionTypeChange();

		this.onJobGroupSelectionTypeChange();
		this.onJobSelectionTypeChange();
		this.onJobItemGroupSelectionTypeChange();
		this.onJobItemSelectionTypeChange();
	},

	onBranchSelectionTypeChange: function() {
		if ( this.current_edit_record['branch_selection_type_id'] === 10 || this.is_viewing ) {
			this.edit_view_ui_dic['branch'].setEnabled( false );
		} else {
			this.edit_view_ui_dic['branch'].setEnabled( true );
		}
	},

	onDepartmentSelectionTypeChange: function() {
		if ( this.current_edit_record['department_selection_type_id'] === 10 || this.is_viewing ) {
			this.edit_view_ui_dic['department'].setEnabled( false );
		} else {
			this.edit_view_ui_dic['department'].setEnabled( true );
		}
	},

	onJobGroupSelectionTypeChange: function() {

		if ( ( LocalCacheData.getCurrentCompany().product_edition_id >= 20 ) ) {

			if ( this.current_edit_record['job_group_selection_type_id'] === 10 || this.is_viewing ) {
				this.edit_view_ui_dic['job_group'].setEnabled( false );
			} else {
				this.edit_view_ui_dic['job_group'].setEnabled( true );
			}
		}
	},

	onJobSelectionTypeChange: function() {
		if ( ( LocalCacheData.getCurrentCompany().product_edition_id >= 20 ) ) {
			if ( this.current_edit_record['job_selection_type_id'] === 10 || this.is_viewing ) {
				this.edit_view_ui_dic['job'].setEnabled( false );
			} else {
				this.edit_view_ui_dic['job'].setEnabled( true );
			}
		}
	},

	onJobItemGroupSelectionTypeChange: function() {
		if ( ( LocalCacheData.getCurrentCompany().product_edition_id >= 20 ) ) {
			if ( this.current_edit_record['job_item_group_selection_type_id'] === 10 || this.is_viewing ) {
				this.edit_view_ui_dic['job_item_group'].setEnabled( false );
			} else {
				this.edit_view_ui_dic['job_item_group'].setEnabled( true );
			}
		}
	},

	onJobItemSelectionTypeChange: function() {
		if ( ( LocalCacheData.getCurrentCompany().product_edition_id >= 20 ) ) {
			if ( this.current_edit_record['job_item_selection_type_id'] === 10 || this.is_viewing ) {
				this.edit_view_ui_dic['job_item'].setEnabled( false );
			} else {
				this.edit_view_ui_dic['job_item'].setEnabled( true );
			}
		}
	},

	onPayTypeChange: function() {

		if ( this.current_edit_record['pay_type_id'] === 10 || this.current_edit_record['pay_type_id'] === 42 ) {
			this.edit_view_form_item_dic['rate'].find( '.edit-view-form-item-label' ).text( $.i18n._( 'Rate' ) + ": " );
			this.edit_view_form_item_dic['rate'].find( '.widget-right-label' ).text( '(' + $.i18n._( 'ie' ) + ': ' + $.i18n._( '1.5 for time and a half' ) + ')' );
			this.edit_view_form_item_dic['wage_group_id'].css( 'display', 'block' );

		} else if ( this.current_edit_record['pay_type_id'] === 20 ) {
			this.edit_view_form_item_dic['rate'].find( '.edit-view-form-item-label' ).text( $.i18n._( 'Premium' ) + ": " );
			this.edit_view_form_item_dic['rate'].find( '.widget-right-label' ).text( '(' + $.i18n._( 'ie' ) + ': ' + $.i18n._( '0.75 for 75 cent/hr' ) + ')' );
			this.edit_view_form_item_dic['wage_group_id'].css( 'display', 'none' );

		} else if ( this.current_edit_record['pay_type_id'] === 30 || this.current_edit_record['pay_type_id'] === 32 || this.current_edit_record['pay_type_id'] === 40 ) {
			this.edit_view_form_item_dic['rate'].find( '.edit-view-form-item-label' ).text( $.i18n._( 'Hourly Rate' ) + ": " );
			this.edit_view_form_item_dic['rate'].find( '.widget-right-label' ).text( '(' + $.i18n._( 'ie' ) + ': ' + $.i18n._( '10.00/hr' ) + ')' );
			this.edit_view_form_item_dic['wage_group_id'].css( 'display', 'block' );
		}
	},

	setTabStatus: function() {

		if ( this.is_mass_editing ) {
			$( this.edit_view_tab.find( 'ul li' )[6] ).hide();
			this.edit_view_tab.tabs( 'select', 0 );
		} else {
			if ( this.subAuditValidate() ) {
				$( this.edit_view_tab.find( 'ul li' )[6] ).show();
			} else {
				$( this.edit_view_tab.find( 'ul li' )[6] ).hide();
				this.edit_view_tab.tabs( 'select', 0 );
			}

		}

		this.editFieldResize( 0 );

	},

	onTypeChange: function() {

		$( this.edit_view_tab.find( 'ul li' )[2] ).hide();
		$( this.edit_view_tab.find( 'ul li' )[3] ).hide();
		$( this.edit_view_tab.find( 'ul li' )[4] ).hide();
		$( this.edit_view_tab.find( 'ul li' )[5] ).hide();

		this.edit_view_form_item_dic['include_partial_punch'].css( 'display', 'block' );

		if ( this.current_edit_record['type_id'] === 10 ) {
			$( this.edit_view_tab.find( 'ul li' )[1] ).show();
			$( this.edit_view_tab.find( 'ul li' )[2] ).hide();
			$( this.edit_view_tab.find( 'ul li' )[3] ).hide();
			$( this.edit_view_tab.find( 'ul li' )[4] ).hide();
			$( this.edit_view_tab.find( 'ul li' )[5] ).hide();
		} else if ( this.current_edit_record['type_id'] === 20 ) {

			this.edit_view_form_item_dic['include_partial_punch'].css( 'display', 'none' );

			$( this.edit_view_tab.find( 'ul li' )[1] ).hide();
			$( this.edit_view_tab.find( 'ul li' )[2] ).show();
			$( this.edit_view_tab.find( 'ul li' )[3] ).hide();
			$( this.edit_view_tab.find( 'ul li' )[4] ).hide();
			$( this.edit_view_tab.find( 'ul li' )[5] ).hide();
		} else if ( this.current_edit_record['type_id'] === 30 ) {

			this.edit_view_form_item_dic['include_partial_punch'].css( 'display', 'none' );

			$( this.edit_view_tab.find( 'ul li' )[1] ).hide();
			$( this.edit_view_tab.find( 'ul li' )[2] ).hide();
			$( this.edit_view_tab.find( 'ul li' )[3] ).show();
			$( this.edit_view_tab.find( 'ul li' )[4] ).hide();
			$( this.edit_view_tab.find( 'ul li' )[5] ).hide();
		} else if ( this.current_edit_record['type_id'] === 40 ) {

			this.edit_view_form_item_dic['include_partial_punch'].css( 'display', 'none' );

			$( this.edit_view_tab.find( 'ul li' )[1] ).hide();
			$( this.edit_view_tab.find( 'ul li' )[2] ).hide();
			$( this.edit_view_tab.find( 'ul li' )[3] ).hide();
			$( this.edit_view_tab.find( 'ul li' )[4] ).show();
			$( this.edit_view_tab.find( 'ul li' )[5] ).hide();

		} else if ( this.current_edit_record['type_id'] === 50 ) {

			this.edit_view_form_item_dic['include_partial_punch'].css( 'display', 'none' );

			$( this.edit_view_tab.find( 'ul li' )[1] ).hide();
			$( this.edit_view_tab.find( 'ul li' )[2] ).show();
			$( this.edit_view_tab.find( 'ul li' )[3] ).hide();
			$( this.edit_view_tab.find( 'ul li' )[4] ).hide();
			$( this.edit_view_tab.find( 'ul li' )[5] ).show();
		} else if ( this.current_edit_record['type_id'] === 90 ) {
			$( this.edit_view_tab.find( 'ul li' )[1] ).hide();
			$( this.edit_view_tab.find( 'ul li' )[2] ).hide();
			$( this.edit_view_tab.find( 'ul li' )[3] ).hide();
			$( this.edit_view_tab.find( 'ul li' )[4] ).hide();
			$( this.edit_view_tab.find( 'ul li' )[5] ).hide();
		} else if ( this.current_edit_record['type_id'] === 100 ) {
			$( this.edit_view_tab.find( 'ul li' )[1] ).show();
			$( this.edit_view_tab.find( 'ul li' )[2] ).show();
			$( this.edit_view_tab.find( 'ul li' )[3] ).hide();
			$( this.edit_view_tab.find( 'ul li' )[4] ).hide();
			$( this.edit_view_tab.find( 'ul li' )[5] ).hide();
		}

		if ( this.current_edit_record.accrual_policy_id ) {
			this.edit_view_form_item_dic['accrual_rate'].css( 'display', 'block' );

		} else {
			this.edit_view_form_item_dic['accrual_rate'].css( 'display', 'none' );
		}
	},
	/* jshint ignore:start */
	onFormItemChange: function( target, doNotValidate ) {

		this.setIsChanged( target );
		this.setMassEditingFieldsWhenFormChange( target );
		var key = target.getField();
		var c_value = target.getValue();
		this.current_edit_record[key] = c_value;

		switch ( key ) {
			case 'minimum_time_between_shift1':
			case 'minimum_time_between_shift2':
				this.current_edit_record['minimum_time_between_shift'] = c_value;
				break;
			case 'daily_trigger_time1':
			case 'daily_trigger_time2':
//				this.edit_view_ui_dic['daily_trigger_time1'].setValue( c_value );
//				this.edit_view_ui_dic['daily_trigger_time2'].setValue( c_value );
				this.current_edit_record['daily_trigger_time'] = c_value;
				break;
//			case 'type_id':
//			case 'accrual_policy_id':
//				this.onTypeChange();
//				break;
		}

//		switch ( key ) {
//			case 'minimum_time':
//			case 'maximum_time':
//			case 'daily_trigger_time':
//			case 'maximum_daily_trigger_time':
//			case 'weekly_trigger_time':
//			case 'maximum_weekly_trigger_time':
//			case 'daily_trigger_time2':
//			case 'maximum_no_break_time':
//			case 'minimum_break_time':
//			case 'minimum_time_between_shift':
//			case 'minimum_first_shift_time':
//			case 'minimum_shift_time':
//				c_value = this.date_api.parseTimeUnit( target.getValue(), {async: false} ).getResult();
//				break;
//		}

		if ( key === 'type_id' || key === 'accrual_policy_id' ) {
			this.onTypeChange();
		}
		if ( key === 'pay_type_id' ) {
			this.onPayTypeChange();
		}
		if ( key === 'branch_selection_type_id' ) {
			this.onBranchSelectionTypeChange();
		}
		if ( key === 'department_selection_type_id' ) {
			this.onDepartmentSelectionTypeChange();
		}
		if ( key === 'job_group_selection_type_id' ) {
			this.onJobGroupSelectionTypeChange();
		}
		if ( key === 'job_selection_type_id' ) {
			this.onJobSelectionTypeChange();
		}
		if ( key === 'job_item_group_selection_type_id' ) {
			this.onJobItemGroupSelectionTypeChange();
		}
		if ( key === 'job_item_selection_type_id' ) {
			this.onJobItemSelectionTypeChange();
		}

		if ( !doNotValidate ) {
			this.validate();
		}

	},
	/* jshint ignore:end */

	onTabShow: function( e, ui ) {

		var key = this.edit_view_tab_selected_index;
		this.editFieldResize( key );
		if ( !this.current_edit_record ) {
			return;
		}
		if ( this.edit_view_tab_selected_index === 6 ) {
			if ( this.current_edit_record.id ) {
				this.edit_view_tab.find( '#tab6' ).find( '.first-column-sub-view' ).css( 'display', 'block' );
				this.initSubLogView( 'tab6' );
			} else {
				this.edit_view_tab.find( '#tab6' ).find( '.first-column-sub-view' ).css( 'display', 'none' );
				this.edit_view.find( '.save-and-continue-div' ).css( 'display', 'block' );
			}
		} else {
			this.buildContextMenu( true );
			this.setEditMenu();
		}

	},

	initTabData: function() {

		if ( this.edit_view_tab.tabs( 'option', 'selected' ) === 6 ) {
			if ( this.current_edit_record.id ) {
				this.edit_view_tab.find( '#tab6' ).find( '.first-column-sub-view' ).css( 'display', 'block' );
				this.initSubLogView( 'tab6' );
			} else {
				this.edit_view_tab.find( '#tab6' ).find( '.first-column-sub-view' ).css( 'display', 'none' );
				this.edit_view.find( '.save-and-continue-div' ).css( 'display', 'block' );
			}
		}
	},

	uniformVariable: function( records ) {

		return records;
	},

	buildSearchFields: function() {

		this._super( 'buildSearchFields' );
		this.search_fields = [

			new SearchField( {label: $.i18n._( 'Name' ),
				in_column: 1,
				field: 'name',
				multiple: true,
				basic_search: true,
				adv_search: false,
				form_item_type: FormItemType.TEXT_INPUT} ),

			new SearchField( {label: $.i18n._( 'Type' ),
				in_column: 1,
				field: 'type_id',
				multiple: true,
				basic_search: true,
				adv_search: false,
				layout_name: ALayoutIDs.OPTION_COLUMN,
				form_item_type: FormItemType.AWESOME_BOX} ),

			new SearchField( {label: $.i18n._( 'Created By' ),
				in_column: 2,
				field: 'created_by',
				layout_name: ALayoutIDs.USER,
				api_class: (APIFactory.getAPIClass( 'APIUser' )),
				multiple: true,
				basic_search: true,
				adv_search: false,
				form_item_type: FormItemType.AWESOME_BOX} ),

			new SearchField( {label: $.i18n._( 'Updated By' ),
				in_column: 2,
				field: 'updated_by',
				layout_name: ALayoutIDs.USER,
				api_class: (APIFactory.getAPIClass( 'APIUser' )),
				multiple: true,
				basic_search: true,
				adv_search: false,
				form_item_type: FormItemType.AWESOME_BOX} )
		];
	}


} );

PremiumPolicyViewController.loadView = function() {

	Global.loadViewSource( 'PremiumPolicy', 'PremiumPolicyView.html', function( result ) {

		var args = {};
		var template = _.template( result, args );

		Global.contentContainer().html( template );
	} );

};