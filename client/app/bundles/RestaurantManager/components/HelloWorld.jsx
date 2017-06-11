import React, { PropTypes } from 'react';

export default class HelloWorld extends React.Component {
  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  constructor(props, _railsContext) {
    super(props);
    console.log(props);
    this.state = { 
    };
  }

  componentDidMount() {
    $('body').addClass('landing-page');
    $('body').attr('id', 'page-top');

    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 80
    });

    // Page scrolling feature
    $('a.page-scroll').bind('click', function(event) {
        var link = $(this);
        $('html, body').stop().animate({
            scrollTop: $(link.attr('href')).offset().top - 50
        }, 500);
        event.preventDefault();
        $("#navbar").collapse('hide');
    });

    let cbpAnimatedHeader = (function() {
        let docElem = document.documentElement,
                header = document.querySelector( '.navbar-default' ),
                didScroll = false,
                changeHeaderOn = 200;
        function init() {
            window.addEventListener( 'scroll', function( event ) {
                if( !didScroll ) {
                    didScroll = true;
                    setTimeout( scrollPage, 250 );
                }
            }, false );
        }
        function scrollPage() {
            let sy = scrollY();
            if ( sy >= changeHeaderOn ) {
                $(header).addClass('navbar-scroll')
            }
            else {
                $(header).removeClass('navbar-scroll')
            }
            didScroll = false;
        }
        function scrollY() {
            return window.pageYOffset || docElem.scrollTop;
        }
        init();

    })();


    // Activate WOW.js plugin for animation on scrol
    new WOW().init();
  }

  render() {
    const enterprise_register_url = this.props.enterprise_register_url;
    return (
      <div>
        <div id="page-top" className="landing-page no-skin-config pace-done">
            <div className="navbar-wrapper">
                <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
                    <div className="container">
                        <div className="navbar-header page-scroll">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#">Restaurant Manager</a>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav navbar-right">
                                <li><a className="page-scroll" href="#page-top">Home</a></li>
                                <li><a className="page-scroll" href="#features">Features</a></li>
                                <li><a className="page-scroll" target="_blank" href={enterprise_register_url}>Signup</a></li>
                                <li><a className="page-scroll" href="#more">More</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <div id="inSlider" className="carousel carousel-fade" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#inSlider" data-slide-to="0" className="active"></li>
                <li data-target="#inSlider" data-slide-to="1"></li>
            </ol>
            <div className="carousel-inner" role="listbox">
                <div className="item active">
                    <div className="container">
                        <div className="carousel-caption blank">
                            <h1>A Restaurant Helper <br/>More Customers. More Profit.</h1>
                            <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p>
                            <p><a className="btn btn-lg btn-primary" href="#" role="button">Learn more</a></p>
                        </div>
                    </div>
                    
                    <div className="header-back one"></div>

                </div>
                <div className="item">
                    <div className="container">
                        <div className="carousel-caption blank">
                            <h1>A Restaurant Helper <br/>More Customers. More Profit.</h1>
                            <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p>
                            <p><a className="btn btn-lg btn-primary" href="#" role="button">Learn more</a></p>
                        </div>
                    </div>
                    
                    <div className="header-back two"></div>
                </div>
            </div>
            <a className="left carousel-control" href="#inSlider" role="button" data-slide="prev">
                <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="right carousel-control" href="#inSlider" role="button" data-slide="next">
                <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
            </div>


            <section id="features" className="container services">
            <div className="row">
                <div className="col-sm-3">
                    <h2>Improve Efficiency</h2>
                    <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus.</p>
                    <p><a className="navy-link" href="#" role="button">Details &raquo;</a></p>
                </div>
                <div className="col-sm-3">
                    <h2>Reduce Cost</h2>
                    <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus.</p>
                    <p><a className="navy-link" href="#" role="button">Details &raquo;</a></p>
                </div>
                <div className="col-sm-3">
                    <h2>MORE Revenue</h2>
                    <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus.</p>
                    <p><a className="navy-link" href="#" role="button">Details &raquo;</a></p>
                </div>
                <div className="col-sm-3">
                    <h2>Ease Operation</h2>
                    <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus.</p>
                    <p><a className="navy-link" href="#" role="button">Details &raquo;</a></p>
                </div>
            </div>
            </section>

            <section id="contact" className="gray-section contact">
            <div className="container">
                <div className="row m-b-lg">
                    <div className="col-lg-12 text-center">
                        <div className="navy-line"></div>
                        <h1>Contact Us</h1>
                        <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.</p>
                    </div>
                </div>
                <div className="row m-b-lg">
                    <div className="col-lg-3 col-lg-offset-3">
                        <address>
                            <strong><span className="navy">Company name, Inc.</span></strong><br/>
                            795 Folsom Ave, Suite 600<br/>
                            San Francisco, CA 94107<br/>
                            <abbr title="Phone">P:</abbr> (123) 456-7890
                        </address>
                    </div>
                    <div className="col-lg-4">
                        <p className="text-color">
                            Consectetur adipisicing elit. Aut eaque, totam corporis laboriosam veritatis quis ad perspiciatis, totam corporis laboriosam veritatis, consectetur adipisicing elit quos non quis ad perspiciatis, totam corporis ea,
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <a href="mailto:test@email.com" className="btn btn-primary">Send us mail</a>
                        <p className="m-t-sm">
                            Or follow us on social platform
                        </p>
                        <ul className="list-inline social-icon">
                            <li><a href="#"><i className="fa fa-twitter"></i></a>
                            </li>
                            <li><a href="#"><i className="fa fa-facebook"></i></a>
                            </li>
                            <li><a href="#"><i className="fa fa-linkedin"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8 col-lg-offset-2 text-center m-t-lg m-b-lg">
                        <p><strong>&copy; 2017 Company Name</strong><br/> consectetur adipisicing elit. Aut eaque, laboriosam veritatis, quos non quis ad perspiciatis, totam corporis ea, alias ut unde.</p>
                    </div>
                </div>
            </div>
            </section>
        </div>
      </div>
    );
  }
}
