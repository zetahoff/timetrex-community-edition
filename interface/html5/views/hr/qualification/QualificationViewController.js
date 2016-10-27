QualificationViewController = BaseViewController.extend( {
	el: '#qualification_view_container',

	type_array: null,
	qualification_group_array: null,

	qualification_group_api: null,

	document_object_type_id: null,

	initialize: function() {
		this._super( 'initialize' );
		this.edit_view_tpl = 'QualificationEditView.html';
		this.permission_id = 'qualification';
		this.viewId = 'Qualification';
		this.script_name = 'QualificationView';
		this.table_name_key = 'qualification';
		this.context_menu_name = $.i18n._( 'Qualification' );
		this.navigation_label = $.i18n._( 'Qualification' ) + ':';
		this.api = new (APIFactory.getAPIClass( 'APIQualification' ))();
		this.qualification_group_api = new (APIFactory.getAPIClass( 'APIQualificationGroup' ))();
		this.document_object_type_id = 120;
		this.render();
		this.buildContextMenu();

		this.initData();
		this.setSelectRibbonMenuIfNecessary( 'Qualification' );

	},

	initOptions: function() {
		var $this = this;

		this.initDropDownOption( 'type' );

		this.qualification_group_api.getQualificationGroup( '', false, false, {onResult: function( res ) {
			res = res.getResult();

			res = Global.buildTreeRecord( res );
			$this.qualification_group_array = res;
			if ( !$this.sub_view_mode && $this.basic_search_field_ui_dic['group_id'] ) {
				$this.basic_search_field_ui_dic['group_id'].setSourceData( res );
			}

		}} );
	},

	setTabStatus: function() {

		if ( this.is_mass_editing ) {

			$( this.edit_view_tab.find( 'ul li' )[1] ).hide();
			$( this.edit_view_tab.find( 'ul li' )[2] ).hide();
			this.edit_view_tab.tabs( 'select', 0 );

		} else {

			if ( this.subDocumentValidate() ) {
				$( this.edit_view_tab.find( 'ul li' )[1] ).show();
			} else {
				$( this.edit_view_tab.find( 'ul li' )[1] ).hide();
				this.edit_view_tab.tabs( 'select', 0 );
			}

			if ( this.subAuditValidate() ) {
				$( this.edit_view_tab.find( 'ul li' )[2] ).show();
			} else {
				$( this.edit_view_tab.find( 'ul li' )[2] ).hide();
				this.edit_view_tab.tabs( 'select', 0 );
			}

		}

		this.editFieldResize( 0 );

	},

	buildEditViewUI: function() {

		this._super( 'buildEditViewUI' );

		var $this = this;

		var tab_0_label = this.edit_view.find( 'a[ref=tab0]' );
		var tab_1_label = this.edit_view.find( 'a[ref=tab1]' );
		var tab_2_label = this.edit_view.find( 'a[ref=tab2]' );
		tab_0_label.text( $.i18n._( 'Qualification' ) );
		tab_1_label.text( $.i18n._( 'Attachments' ) );
		tab_2_label.text( $.i18n._( 'Audit' ) );

		this.navigation.AComboBox( {
			api_class: (APIFactory.getAPIClass( 'APIQualification' )),
			id: this.script_name + '_navigation',
			allow_multiple_selection: false,
			layout_name: ALayoutIDs.QUALIFICATION,
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

		form_item_input.TTextInput( {field: 'name', width: 359} );
		this.addEditFieldToColumn( $.i18n._( 'Name' ), form_item_input, tab0_column1, '' );

		//Type
		form_item_input = Global.loadWidgetByName( FormItemType.COMBO_BOX );
		form_item_input.TComboBox( {field: 'type_id'} );
		form_item_input.setSourceData( Global.addFirstItemToArray( $this.type_array ) );
		this.addEditFieldToColumn( $.i18n._( 'Type' ), form_item_input, tab0_column1 );

		//Group
		form_item_input = Global.loadWidgetByName( FormItemType.AWESOME_BOX );

		form_item_input.AComboBox( {
			tree_mode: true,
			allow_multiple_selection: false,
			layout_name: ALayoutIDs.TREE_COLUMN,
			set_empty: true,
			field: 'group_id'
		} );
		form_item_input.setSourceData( Global.addFirstItemToArray( $this.qualification_group_array ) );
		this.addEditFieldToColumn( $.i18n._( 'Qualification Group' ), form_item_input, tab0_column1 );

		// Description
		form_item_input = Global.loadWidgetByName( FormItemType.TEXT_AREA );
		form_item_input.TTextArea( { field: 'description' } );
		this.addEditFieldToColumn( $.i18n._( 'Description' ), form_item_input, tab0_column1, '', null, null, true );

		//Tags
		form_item_input = Global.loadWidgetByName( FormItemType.TAG_INPUT );

		form_item_input.TTagInput( {field: 'tag', object_type_id: 250} );
		this.addEditFieldToColumn( $.i18n._( 'Tags' ), form_item_input, tab0_column1, '', null, null, true );

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

			new SearchField( {label: $.i18n._( 'Tags' ),
				field: 'tag',
				basic_search: true,
				adv_search: false,
				in_column: 1,
				object_type_id: 250,
				form_item_type: FormItemType.TAG_INPUT} ),

			new SearchField( {label: $.i18n._( 'Group' ),
				in_column: 2,
				multiple: true,
				field: 'group_id',
				layout_name: ALayoutIDs.TREE_COLUMN,
				tree_mode: true,
				basic_search: true,
				adv_search: false,
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
	},

	onTabShow: function( e, ui ) {

		var key = this.edit_view_tab_selected_index;
		this.editFieldResize( key );
		if ( !this.current_edit_record ) {
			return;
		}

		if ( this.edit_view_tab_selected_index === 1 ) {
			if ( this.current_edit_record.id ) {
				this.edit_view_tab.find( '#tab1' ).find( '.first-column-sub-view' ).css( 'display', 'block' );
				this.initSubDocumentView();
			} else {
				this.edit_view_tab.find( '#tab1' ).find( '.first-column-sub-view' ).css( 'display', 'none' );
				this.edit_view.find( '.save-and-continue-div' ).css( 'display', 'block' );
			}

		} else if ( this.edit_view_tab_selected_index === 2 ) {

			if ( this.current_edit_record.id ) {
				this.edit_view_tab.find( '#tab2' ).find( '.first-column-sub-view' ).css( 'display', 'block' );
				this.initSubLogView( 'tab2' );
			} else {
				this.edit_view_tab.find( '#tab2' ).find( '.first-column-sub-view' ).css( 'display', 'none' );
				this.edit_view.find( '.save-and-continue-div' ).css( 'display', 'block' );
			}
		} else {
			this.buildContextMenu( true );
			this.setEditMenu();
		}
	},

	initTabData: function() {

		if ( this.edit_view_tab.tabs( 'option', 'selected' ) === 1 ) {
			if ( this.current_edit_record.id ) {
				this.edit_view_tab.find( '#tab1' ).find( '.first-column-sub-view' ).css( 'display', 'block' );
				this.initSubDocumentView();
			} else {
				this.edit_view_tab.find( '#tab1' ).find( '.first-column-sub-view' ).css( 'display', 'none' );
				this.edit_view.find( '.save-and-continue-div' ).css( 'display', 'block' );
			}
		} else if ( this.edit_view_tab.tabs( 'option', 'selected' ) === 2 ) {
			if ( this.current_edit_record.id ) {
				this.edit_view_tab.find( '#tab2' ).find( '.first-column-sub-view' ).css( 'display', 'block' );
				this.initSubLogView( 'tab2' );
			} else {
				this.edit_view_tab.find( '#tab2' ).find( '.first-column-sub-view' ).css( 'display', 'none' );
				this.edit_view.find( '.save-and-continue-div' ).css( 'display', 'block' );
			}
		}
	},

	removeEditView: function() {

		this._super( 'removeEditView' );
		this.sub_document_view_controller = null;

	},

	initSubDocumentView: function() {
		var $this = this;

		if ( this.sub_document_view_controller ) {
			this.sub_document_view_controller.buildContextMenu( true );
			this.sub_document_view_controller.setDefaultMenu();
			$this.sub_document_view_controller.parent_value = $this.current_edit_record.id;
			$this.sub_document_view_controller.parent_edit_record = $this.current_edit_record;
			$this.sub_document_view_controller.initData();
			return;
		}

		Global.loadScriptAsync( 'views/document/DocumentViewController.js', function() {
			var tab1 = $this.edit_view_tab.find( '#tab1' );
			var firstColumn = tab1.find( '.first-column-sub-view' );
			Global.trackView( 'Sub' + 'Document' + 'View' );
			DocumentViewController.loadSubView( firstColumn, beforeLoadView, afterLoadView );

		} );

		function beforeLoadView() {

		}

		function afterLoadView( subViewController ) {
			$this.sub_document_view_controller = subViewController;
			$this.sub_document_view_controller.parent_key = 'object_id';
			$this.sub_document_view_controller.parent_value = $this.current_edit_record.id;
			$this.sub_document_view_controller.document_object_type_id = $this.document_object_type_id;
			$this.sub_document_view_controller.parent_edit_record = $this.current_edit_record;
			$this.sub_document_view_controller.parent_view_controller = $this;
			$this.sub_document_view_controller.initData();
		}

	}


} );

QualificationViewController.loadView = function() {

	Global.loadViewSource( 'Qualification', 'QualificationView.html', function( result ) {

		var args = {};
		var template = _.template( result, args );

		Global.contentContainer().html( template );
	} );

};