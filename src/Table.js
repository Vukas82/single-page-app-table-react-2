import React, {Component} from 'react';
import TagModal from './TagModal';
import EditModal from './EditModal';

import './Table.css';

import $ from 'jquery'
$.DataTable = require( 'datatables.net-bs4' );



class Table extends Component {
    constructor(props) {
        console.log(props)
        super(props);
    
        // console.log(props)  //OK

        // this.props ={modalIsOpen: false,}

    this.state = {
        firstName: null,
        formErrors: {
            firstName: "",
        },

        visible: true,
        modalIsOpen: false,
        backdrop: true,
        favorite: true,
        feed: true,
        provera : false,
        isEdit : false,
        
    }
                            // Instead of $('#myID').click(function(){...});
                            // I used $('body').on('click','#myID',function(){});
                        
}
    componentDidMount = () => {

        $(document).ready(function() {

             // edit/send value in tagModal

                    $('body').on( 'click', '.edit', function(){ console.log('nesto')
                        // this.setState({
                            // this.props.modalIsOpen = !this.props.modalIsOpen  // ????? ovde je greska
                            console.log(this.props)
                        // })
                         $('#myTable tr ').click(function() {       
                             
                            var table = $('#myTable').DataTable();
                            var data = table.row( $(this) ).data();
                            this.props = data;
                            
                        });
                    });

        // pointers
            $(delRowPointer);
                 function delRowPointer () {
                $('.delrow').css( 'cursor', 'pointer' );
                }

                $(plusPointer);
                function plusPointer () {
                    $('.plus').css( 'cursor', 'pointer' );
                }

                    $(editPointer);
                function editPointer () {
                    $('.edit').css( 'cursor', 'pointer' );
                    }
        
                    // delete row
                $(function() {
                    $('tr')
                        .find('td')
                        $('.delrow').click(function(){
                            $(this).parent().parent().remove(); //Deleting the Row (tr) Element 
                    });
                });

                    // search bar
                $('#myTable_filter label').each(function(){
                    $(this).css('padding', 0).css('float','left').css('display','inline').css('width','0.6em').css('padding-top', '100px');
                });

                    // search bar label
                $('#myTable_filter label input').each(function(){
                    $(this).css('margin', 0).css('float','left').css('display','block').css('width','20em');
                });

                    // dataTables info status
                $(init1);
                function init1 () {
                $('#myTable_info').remove();
                }

                    // dataTables show entries
                $('#myTable_length label').each(function(){
                    $(this).css('margin', 0).css('float','left');
                });

                    // show entries promena diva i mesta u dom-u 
                $(init);
                function init () { 
                $('#myTable_wrapper > div:nth-child(3) > div.col-sm-12.col-md-5').append( $('#myTable_length label'));
                }

                $(init3);
                function init3 () {
                $('#myTable_wrapper > div:nth-child(3) > div.col-sm-12.col-md-5');
                }

                $(init4);
                function init4 () {
                $('#myTable_wrapper > div:nth-child(3) > div.col-sm-12.col-md-5 > label > select').css('width', '65px').css('float', 'right');
                }

                $(init5);
                function init5 () {
                $('#myTable_wrapper > div:nth-child(1) > div:nth-child(1)').remove();
                }

                var r = $('#myTable thead tr',);
                r.find('th').each(function(){
                    $(this).css('padding', 0).css('border', 'none');
                });
                $('#myTable thead').append(r);
                $('#search_0').css('text-align', 'center');
               

           // Setup - add a text input to each header cell   ne reorderuje klikom na input heder nejm u inpitu!!!! radi
           $('#myTable thead th').each(function() {
            var title = $('#myTable thead th').eq($(this).index()).text();
            $(this).html('<input type="text" placeholder="&#xF002; '+ title +'" style="font-family:Arial, FontAwesome" />');
        });
        
        // DataTable
        var table = $('#myTable').DataTable();
        
        // Apply the search
        table.columns().eq(0).each(function(colIdx) {
            $('input', table.column(colIdx).header()).on('keyup change', function() {
                table
                    .column(colIdx)
                    .search(this.value)
                    .draw();
            });
        
            $('input', table.column(colIdx).header()).on('click', function(e) {
                e.stopPropagation();
            });
        });
    } );
      
        this.$el = $(this.el)
        this.$el.DataTable( {
              data: this.props.data,
              
              columns:[
                  { title: 'Tag ID'},
                  { title: 'Tag Name'},
                  { title: 'Tag Type'},
                  { title: 'My Feed.', "render": () => { return '<span><i class="fa fa-check"></i></span>'; }},
                  { title: 'My Favourites', "render": () => { return '<span><i class="fa fa-check"></i></span>'; }},
                  { title: 'Action', "render": () => { return ' <span class="edit" onClick={this.onClick}><i class="fa fa-pencil"></i></span> &nbsp &nbsp<span class="delrow"><i class="fa fa-close"></i></span>' }},//{return '<button id="span">btn</button>';}}, //{ return '<span id="span">&#x270f;</span><span>&#x271a;</span>'; }}
              ],
          },               
        );
        
    this.handleChange = this.handleChange.bind(this);
    this.$el.on('change', this.handleChange);
    }

    toggle(){this.setState({visible: !this.state.visible})}

    componentDidUpdate(prevProps) {
        if (prevProps.children !== this.props.children) {
          this.$el.trigger("DataTable:updated");
        }
      }

    componentWillUnmount() {
        this.$el.off('change', this.handleChange);
        this.$el.DataTable.destroy(true);
    }

    handleChange(e) {
        this.props.onChange(e.target.value);
      }

    render() {
        return(
            <div className="container">
                {(!this.state.isEdit) ? <TagModal></TagModal> : <EditModal 
                                                                id={this.props.id}
                                                                name={this.props.name}
                                                                myFeed={this.props.name}
                                                                myFavorites={this.props.name}>
                                                                </EditModal>}                
                    <table id="myTable" className="table table-striped table-bordered table-hover table-sm" width="70%" ref = { el => this.el = el }>
                    {this.props.children}
                    </table>
            </div>    
            
        )
    }
    
}

export default Table;
